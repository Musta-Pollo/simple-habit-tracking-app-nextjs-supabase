interface FilterFunction<T> {
  (data: T[]): T[];
}

export const applyFilter = <T>(
  data: T[],
  condition: boolean,
  filterFn: FilterFunction<T>
): T[] => {
  return condition ? filterFn(data) : data;
};
