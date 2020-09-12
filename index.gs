const main = (() => {
  let label_map;
  let folder_map; 

  // Main entrypoint
  function main() {
    [label_map, folder_map] = getOrCreateHandles();
    updateScreeningForDestinations(gn.screen_destinations);
  }

  function updateScreeningForDestinations(destinations) {
    destinations.forEach((id, key) => updateScreening(id));
  }

  function updateScreening(destination) {
    // if an email has been moved to an action label we update its screening.
    let action_id = gn.actionId(destination);
    let action_label = label_map[action_id];
    let destination_label = label_map[destination];
    let threads = action_label.getThreads();
    threads.forEach((thread) => {
      let messages = thread.getMessages();
      // We only act based on the first message's sender.
      let message = messages[0];
      if (!message) { return }
      // Do some light normalization.
      let email = gn.extractEmailFromFrom(message.getFrom()).toLowerCase();
      // Set up the screening to work in future.
      setEmailScreening(email, destination);
      // Clean *all* Gnice labels.
      gn.screen_destinations
        .concat(gn.screen_destinations.map(gn.actionId))
        .forEach((id) => {
          let label = label_map[id];
          label.removeFromThread(thread);
        });
      // Finally move this thread where indicated.
      destination_label.addToThread(thread);
      // N.B. We don't move past threads.
      // If required, considering doing through a separate entrypoint/trigger.
    });
  }

  function setEmailScreening(email, destination) {
    // first remove from any existing destination folders.
    gn.screen_destinations.forEach((id) => {
      let folder = folder_map[id];
      let existing_screens = folder.getFilesByName(email);
      while (existing_screens.hasNext()) {
        let file = existing_screens.next();
        file.setTrashed(true);
      }
    });
    // then put the email in the new destination folder.
    let destination_folder = folder_map[destination];
    destination_folder.createFile(email, '');
  }

  function processNewThreads() {

  }

  return main;

})();

function gnice() { main() }