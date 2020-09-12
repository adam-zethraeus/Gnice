const config = (() => {
  // Identity lists
  const gnice_config_folder_name = "gnice_config";
  const gnice_internal_labels = ["to_screen", "processing"];
  const gnice_screen_destinations = [
    "inbox",
    "feed",
    "paper_trail",
    "screened_out"
  ];

  function label(name) { return `gnice/${name}` }
  const id_label_pairs = gnice_screen_destinations.concat(gnice_internal_labels).map(name => [name, label(name)]);

  // Individual identities
  const [inbox, feed, paper_trail, screened_out] = gnice_screen_destinations;
  const [to_screen, processing] = gnice_internal_labels;

  return { id_label_pairs, inbox, feed, paper_trail, screened_out, to_screen, processing, gnice_screen_destinations, gnice_internal_labels, gnice_config_folder_name }
})();
