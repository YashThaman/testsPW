export function getMilliseconds(
    duration: number,
    unit: 'seconds' | 'minutes',
   ): number {
    if (unit === 'seconds') {
      return duration * 1000; // Convert seconds to milliseconds
    }
    if (unit === 'minutes') {
      return duration * 60 * 1000; // Convert minutes to milliseconds
    }
    throw new Error('Please use "seconds" or "minutes"!');
   }
      