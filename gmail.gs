function getLabels(names) {
  return names.map(([id, full_name]) => [id, id === gn.inbox ? undefined : GmailApp.getUserLabelByName(full_name)]);
}

function createLabels(labels) {
  return labels.map(([id, full_name]) => [id, id === gn.inbox ? undefined : GmailApp.createLabel(full_name)]);
}
