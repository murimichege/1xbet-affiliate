export const exportToCSV = (data: Record<string, any>[], filename: string) => {
    const csvContent = [
      Object.keys(data[0]).join(','), // headers
      ...data.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  