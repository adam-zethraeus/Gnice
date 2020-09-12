const config = (() => {
  // Identity lists
  const gnice_config_folder_name = "gnice_config";
  const gnice_internal_labels = ["to_screen", "processing"];
  const gnice_screen_destinations = [
    "inbox",
    "feed",
    "paper_trail",
    "screened_out"
  ]

  // Individual identities
  const [inbox, feed, paper_trail, screened_out] = gnice_screen_destinations;
  const [to_screen, processing] = gnice_internal_labels;

  return { inbox, feed, paper_trail, screened_out, to_screen, processing, gnice_screen_destinations, gnice_internal_labels, gnice_config_folder_name }
})();
