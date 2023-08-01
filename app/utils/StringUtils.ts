abstract class StringUtils {

  static getNumericCoordinate(coordinate: string): number {
    const direction = coordinate.slice(-1);
    coordinate = coordinate.slice(0, -1);
    return ['S', 'W'].includes(direction) ? -parseFloat(coordinate) : parseFloat(coordinate);
  }

  static snakeCaseStrToCapitalizedArray(str): string[] {
    return str.split(',').map(word => {
      const words = word.split('_');
      const capitalizedWords = words.map((w, index) => index === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w);
      return capitalizedWords.join('');
    });
  }
}

export default StringUtils;
