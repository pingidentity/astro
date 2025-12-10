import CodeTagsIcon from '@pingux/mdi-react/CodeTagsIcon';
import FileDocumentOutlineIcon from '@pingux/mdi-react/FileDocumentOutlineIcon';
import FolderZipOutlineIcon from '@pingux/mdi-react/FolderZipOutlineIcon';
import TableLargeIcon from '@pingux/mdi-react/TableLargeIcon';

export const fileTypeConfig = {
  pdf: { icon: FileDocumentOutlineIcon, color: 'lightPink' },
  doc: { icon: FileDocumentOutlineIcon, color: 'lightPink' },
  docx: { icon: FileDocumentOutlineIcon, color: 'lightPink' },
  text: { icon: FileDocumentOutlineIcon, color: 'lightPink' },
  csv: { icon: TableLargeIcon, color: 'lightGreen' },
  xls: { icon: TableLargeIcon, color: 'lightGreen' },
  xlsx: { icon: TableLargeIcon, color: 'lightGreen' },
  js: { icon: CodeTagsIcon, color: 'lightYellow' },
  zip: { icon: FolderZipOutlineIcon, color: 'lightIndigo' },
};
