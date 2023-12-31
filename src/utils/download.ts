export const downloadFile = (url: string, title: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_BLANK";
  anchor.download = `${title}.pdf`;
  anchor.click();
};
