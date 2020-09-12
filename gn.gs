const gn = (() => {
  const email_extraction_regex = /<(.*@.*\..*)>/; 
  const extractEmailFromFrom = (from_string) => {
    let match = email_extraction_regex.exec(from_string);
    return !!match ? match[1] : undefined;
  };
  const normalizedFrom = (from_string) => {
    return extractEmailFromFrom(from_string).toLowerCase().normalize();
  }
  // Identity lists
  const config_folder_name = "gnice_config";
  const internal_labels = ["to_screen", "processing"];
  const screen_destinations = [
    "inbox",
    "feed",
    "paper_trail",
    "screened_out",
  ];

  // Individual identities
  const [inbox, _1, _2, _3] = screen_destinations;
  const [to_screen, processing] = internal_labels;
  const actionId = (id) => `@-${id}`;
  const label = (id) => `gnice/${id}`;
  const id_label_pairs = screen_destinations
    .concat(screen_destinations.map(actionId))
    .concat(internal_labels)
    .map(name => [name, label(name)]);

  return { normalizedFrom, id_label_pairs, actionId, inbox, processing, to_screen, screen_destinations, internal_labels, config_folder_name }
})();
