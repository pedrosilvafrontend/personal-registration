export class Util {
  static objectCompare( option: any, value: any ) : boolean {
    return option.id && (option.id === value?.id);
  }
}
