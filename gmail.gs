function getLabels(names) {
  return names.map(([id, full_name]) => [id, GmailApp.getUserLabelByName(full_name)]);
}

function createLabels(labels) {
  return labels.map(([id, full_name]) => [id, GmailApp.createLabel(full_name)]);
}