abstract class Utils {

  static getNumericCoordinate (coordinate: string): number {
    const direction = coordinate.slice(-1);
    coordinate = coordinate.slice(0, -1);
    return ['S', 'W'].includes(direction) ? -parseFloat(coordinate) : parseFloat(coordinate);
  }
}

export default Utils;
