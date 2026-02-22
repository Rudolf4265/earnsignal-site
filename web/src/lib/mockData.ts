import { adaptDashboard, adaptMe, adaptReportDetail, adaptReports } from "@/lib/adapters";

export const mockMe = adaptMe({});
export const mockDashboard = adaptDashboard({});
export const mockReports = adaptReports({ reports: [] });
export const mockReportDetail = adaptReportDetail({});
