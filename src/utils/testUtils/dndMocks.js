/* eslint max-classes-per-file: 0 */

class FileSystemDirectoryReader {
  constructor(entries) {
    this._entries = entries;
  }

  readEntries(cb) {
    const entries = this._entries;
    this._entries = [];
    cb(entries);
  }
}

export class FileSystemDirectoryEntry {
  constructor(name, entries) {
    this.isFile = false;
    this.isDirectory = true;
    this.name = name;
    this._entries = entries;
  }

  createReader() {
    return new FileSystemDirectoryReader(this._entries);
  }
}

export class FileSystemFileEntry {
  constructor(file) {
    this.isFile = true;
    this.isDirectory = false;
    this.name = file.name;
    this._file = file;
  }

  file(cb) {
    cb(this._file);
  }
}

export class DataTransferItem {
  constructor(type, data, kind = 'string') {
    this.kind = kind;
    this.type = type;
    this._data = data;
  }

  getAsString(callback) {
    if (this.kind === 'string') {
      callback(this._data);
    }
  }

  getAsFile() {
    if (this.kind === 'file' && this._data instanceof FileSystemFileEntry) {
      return this._data._file;
    }
    return null;
  }

  webkitGetAsEntry() {
    if (this.kind === 'file') {
      return this._data;
    }
    return null;
  }
}

export class DataTransferItemList {
  constructor(items = []) {
    this._items = items;
  }

  add(data, type) {
    if (data instanceof File) {
      this._items.push(new DataTransferItem(data.type, new FileSystemFileEntry(data), 'file'));
    } else if (data instanceof FileSystemDirectoryEntry) {
      // Not supported in the real API but used for mocking...
      this._items.push(new DataTransferItem('', data, 'file'));
    } else {
      this._items.push(new DataTransferItem(type, data));
    }
  }

  * [Symbol.iterator]() {
    yield* this._items;
  }
}

export class DataTransfer {
  constructor() {
    this.items = new DataTransferItemList();
    this.dropEffect = 'none';
    this.effectAllowed = 'all';
  }

  setDragImage(dragImage, x, y) {
    this._dragImage = { node: dragImage, x, y };
  }

  get types() {
    const types = new Set();
    // for (const item of this.items) {
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].kind === 'file') {
        types.add('Files');
      } else {
        types.add(this.items[i].type);
      }
    }
    return [...types];
  }

  get files() {
    return this.items._items.filter(item => item.kind === 'file').map(item => item.getAsFile());
  }

  getData(type) {
    return this.items._items.find(item => item.kind === 'string' && item.type === type)?._data;
  }
}

export class DragEvent extends MouseEvent {
  constructor(type, init) {
    super(type, { ...init, bubbles: true, cancelable: true, composed: true });
    this.dataTransfer = init.dataTransfer;
  }
}
