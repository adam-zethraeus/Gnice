function getOrCreateHandles() {
  let lable_names = config.id_label_pairs;
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
