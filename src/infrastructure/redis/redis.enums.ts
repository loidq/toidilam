export enum CKEY {
  USER = 'USER', // Cache thông tin user
  PROJECT = 'PROJECT', // Cache thông tin project
  STATUS = 'STATUS', // Cache trạng thái task
  USER_ORGS = 'USER_ORGS', // Cache danh sách org của user
  USER_PROJECT = 'USER_PROJECT', // Cache danh sách project của user
  PROJECT_STATUS = 'PROJECT_STATUS', // Cache trạng thái project
  PROJECT_MEMBER = 'PROJECT_MEMBER', // Cache thành viên project
  PROJECT_POINT = 'PROJECT_POINT', // Cache điểm số project
  PROJECT_VISION = 'PROJECT_VISION', // Cache tầm nhìn project
  PROJECT_TASK_COUNTER = 'PROJECT_TASK_COUNTER', // Cache bộ đếm task
  TODO_COUNTER = 'TODO_COUNTER', // Cache số lượng task chưa hoàn thành
  TASK_QUERY = 'TASK_QUERY', // Cache kết quả query task
  FAV_QUERY = 'FAV_QUERY', // Cache danh sách yêu thích
  ORG_STORAGE_SIZE = 'ORG_STORAGE_SIZE', // Cache dung lượng storage tổ chức
  ORG_MAX_STORAGE_SIZE = 'ORG_MAX_STORAGE_SIZE', // Cache giới hạn storage
  // Dashboard Cache Keys
  DASHBOARD_SUMMARY = 'DASHBOARD_SUMMARY', // Cache dashboard summary data
  DASHBOARD_CHART = 'DASHBOARD_CHART', // Cache dashboard chart data
  DASHBOARD_BURN_CHART = 'DASHBOARD_BURN_CHART', // Cache burn chart data
  DASHBOARD_COLUMN_CHART = 'DASHBOARD_COLUMN_CHART', // Cache column chart data
  DASHBOARD_STATS = 'DASHBOARD_STATS', // Cache dashboard statistics
  // Report Cache Keys
  PROJECT_REPORT = 'PROJECT_REPORT', // Cache project reports
  MEMBER_REPORT = 'MEMBER_REPORT', // Cache member reports
  // Task Cache Keys
  TASK_LIST = 'TASK_LIST', // Cache task lists
  TASK_STATUS_LIST = 'TASK_STATUS_LIST', // Cache task status lists
  TASK_STATS = 'TASK_STATS', // Cache task statistics
}
