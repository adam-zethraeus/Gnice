const main = (() => {

  const resetEditMarked = (env) => {
    // could mark old matches as processing to allow a parse over even if timing out.
  }
  const parseProcessingInDestination = (env) => {
    // should write the full 'From' fields to file if not present.
  }
  const parseProcessingInScreening = (env) => {
    // must not remove processing label
  }

  return () => {
    let env = setupEnvironmentForConfiguration(configuration);
    resetEditMarked(env);
    parseProcessingInDestination(env);
    parseProcessingInScreening(env);
  }
})()


const old_main = (() => {
  let label_map;
  let folder_map; 

  // Main entrypoint
  function main() {
    [label_map, folder_map] = getOrCreateHandles();
    updateScreeningForDestinations(gn.screen_destinations);
    screenNewThreads();
  }

  function screenNewThreads() {
    let processing_label = label_map[gn.processing];
    let threads = processing_label.getThreads();
    threads.forEach(screenNewThread);
  }

  function screenNewThread(thread) {
    let destination = findDestination(thread);
    removeAllLabels(thread);
    moveThreadToDestination(thread, destination);
  }

  function findDestination(thread) {
    let messages = thread.getMessages();
    // We only act based on the first message's sender.
    let message = messages[0];
    if (!message) { return }
    // Do some light normalization.
    let from_val = gn.normalizedFrom(message.getFrom());
    let destination = gn.screen_destinations.map((id)=>{
      let folder = folder_map[id];
      let files = folder.getFilesByName(from_val);
      while (files.hasNext()) {
        let curr = files.next();
        if (curr.getName().valueOf() === from_val.valueOf()) {
          return id;
        }
      }
    }).filter((destination) => !!destination);
    return destination.length > 0 ? destination[0] : gn.to_screen;
  }

  function updateScreeningForDestinations(destinations) {
    destinations.forEach((id, key) => updateScreening(id));
  }

  function updateScreening(destination) {
    // if an email has been moved to an action label we update its screening.
    let action_id = gn.actionId(destination);
    let action_label = label_map[action_id];
    let threads = action_label.getThreads();
    threads.forEach((thread) => {
      let messages = thread.getMessages();
      // We only act based on the first message's sender.
      let message = messages[0];
      if (!message) { return }
      // Do some light normalization.
      let from_val = gn.normalizedFrom(message.getFrom());
      if (!from_val) { throw "The 'From' field of the email couldn't be parsed." }
      // Set up the screening to work in future.
      setEmailScreening(from_val, destination);
      // Clean *all* Gnice labels.
      removeAllLabels(thread);
      // Finally move this thread where indicated.
      moveThreadToDestination(thread, destination);
    });
  }

  function removeAllLabels(thread) {
    gn.screen_destinations.filter((id) => id !== gn.inbox)
      .concat(gn.internal_labels)
      .concat(gn.screen_destinations.map(gn.actionId))
      .forEach((id) => {
        let label = label_map[id];
        label.removeFromThread(thread);
      });
  }

  function moveThreadToDestination(thread, destination) {
    // N.B. We don't move past threads.
    // If required, considering doing through a separate entrypoint/trigger.
    if (destination == gn.inbox) {
      thread.moveToInbox();
    } else if (destination == gn.to_screen) {
      let to_screen_label = label_map[gn.to_screen];
      to_screen_label.addToThread(thread);
    } else {
      let destination_label = label_map[destination];
      destination_label.addToThread(thread);
    }
  }

  function setEmailScreening(from_val, destination) {
    // first remove from any existing destination folders.
    gn.screen_destinations.forEach((id) => {
      let folder = folder_map[id];
      let existing_screens = folder.getFilesByName(from_val);
      while (existing_screens.hasNext()) {
        let file = existing_screens.next();
        file.setTrashed(true);
      }
    });
    // then put the from_val in the new destination folder.
    let destination_folder = folder_map[destination];
    destination_folder.createFile(from_val, from_val);
  }

  return main;

})();

function gnice() { main() }
