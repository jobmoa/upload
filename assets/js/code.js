// HTML 파일에서 호출되는 doGet 함수
function doGet() {
  // 'UploadForm'은 HTML 파일 이름을 의미합니다.
  return HtmlService.createHtmlOutputFromFile('UploadForm').setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * 파일 업로드 처리 함수
 * @param {string} base64Data - Base64로 인코딩된 파일 데이터
 * @param {string} fileName - 저장할 파일 이름
 * @returns {string} - 업로드 성공 메시지 또는 오류 메시지
 */
function uploadFile(base64Data, fileName) {
  try {
    // 파일을 저장할 구글 드라이브 폴더 ID
    var folderId = '16IG1h-TfWg1d5f-7liNXL-aKG67o_Yqt';
    var folder = DriveApp.getFolderById(folderId);

    // Base64 데이터의 컨텐츠 타입과 데이터 분리
    var contentTypeMatch = base64Data.match(/^data:(.*?);base64,/);
    if (!contentTypeMatch) {
      throw new Error('Base64 데이터 형식이 잘못되었습니다.');
    }
    var contentType = contentTypeMatch[1];
    var base64String = base64Data.split(',')[1];

    // Base64 문자열 디코딩
    var decodedData = Utilities.base64Decode(base64String);
    var blob = Utilities.newBlob(decodedData, contentType, fileName);

    // 파일 생성 및 업로드
    var file = folder.createFile(blob);

    return `파일 업로드 성공: ${file.getName()}`;
  } catch (error) {
    // 에러 발생 시 상세 메시지 반환
    return `파일 업로드 중 오류 발생: ${error.message}`;
  }
}