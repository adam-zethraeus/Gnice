// Convenience identity mappers
function label(name) { return `gnice/${name}` }
function filename(name) { return `${name}.txt` }
function allLabelNames() { return config.gnice_screen_destinations.concat(config.gnice_internal_labels).map(name => [name, label(name)]) }
function allFileNames() { return config.gnice_screen_destinations.map(name => [name, filename(name)]) }


// Main entrypoint
function Gnice() {
  let [labels, files] = getOrCreateHandles();
}

// Setup
function getOrCreateHandles() {
  let lable_names = allLabelNames();
  let label_handles = getLabels(lable_names);
  let labels_to_create = lable_names.map((name, index) => !label_handles[index][1] && name).filter(name => !!name);
  let new_label_handles = createLabels(labels_to_create);
  label_handles = label_handles.concat(new_label_handles);
  
  let gnice_folder = getDriveConfigFolder() || createDriveConfigFolder();
  if (!gnice_folder) { throw "Gnice Drive config folder could not be set up." }

  let folder_names = config.gnice_screen_destinations;
  let folder_handles = getFoldersInFolder(folder_names, gnice_folder);
  let folders_to_create = folder_names.map((name, index) => !folder_handles[index][1] && name).filter(name => !!name);
  let new_folders = createFoldersInFolder(folders_to_create, gnice_folder);
  folder_handles = folder_handles.concat();

  return [
    label_handles.reduce((acc, [name, handle]) => { acc[name] = handle; return acc }, {}),
    folder_handles.reduce((acc, [name, handle]) => { acc[name] = handle; return acc }, {})
   ];
}

// Google Apps integrations

// Gmail
function getLabels(names) {
  return names.map(([id, full_name]) => [id, GmailApp.getUserLabelByName(full_name)]);
}

function createLabels(labels) {
  return labels.map(([id, full_name]) => [id, GmailApp.createLabel(full_name)]);
}

// Drive
function getDriveConfigFolder() {
  let root = DriveApp.getRootFolder();
  return findFolderImmediatelyInFolder(config.gnice_config_folder_name, root);
}

function createDriveConfigFolder() {
  let root = DriveApp.getRootFolder();
  return root.createFolder(config.gnice_config_folder_name);
}

function createFoldersInFolder(new_folder_names, folder) {
  return new_folder_names.map(name => [name, folder.createFolder(name)]);
}

function getFilesInFolder(file_names, folder) {
  return file_names.map(([id, full_name]) => [id, findFileImmediatelyInFolder(full_name, folder)]);
}

function createFilesInFolder(file_names, folder) {
  return file_names.map(([id, full_name]) => [id, folder.createFile(full_name, '')]);
}

function getFoldersInFolder(folder_names, folder) {
  return folder_names.map((id) => [id, findFolderImmediatelyInFolder(id, folder)]);
}

function findFolderImmediatelyInFolder(name, folder) {
  let iterator = folder.getFoldersByName(name);
  while (iterator.hasNext()) {
    let curr = iterator.next();
    let parent_iterator = curr.getParents();
    while (parent_iterator.hasNext()) {
      let parent = parent_iterator.next();
      if (parent.getId() === folder.getId()) {
        return curr;
      }
    }
  }
}

function findFileImmediatelyInFolder(name, folder) {
  let iterator = folder.getFilesByName(name);
  while (iterator.hasNext()) {
    let curr = iterator.next();
    let parent_iterator = curr.getParents();
    while (parent_iterator.hasNext()) {
      let parent = parent_iterator.next();
      if (parent.getId() === folder.getId()) {
        return curr;
      }
    }
  }
}

function getFilesImmediatelyInFolder(names, folder) {
  return names.map(name => findFileImmediatelyInFolder(name, folder));
}