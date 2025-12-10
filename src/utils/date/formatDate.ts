// 날짜 포맷팅 유틸리티
const formatDate = (dateString: string): string => {
  if (!dateString || dateString.length !== 8) return dateString;

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}-${month}-${day}`;
};

export default formatDate;
