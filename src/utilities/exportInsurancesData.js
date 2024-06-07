import * as XLSX from "xlsx";
import moment from "moment";
import _ from "lodash";

export const exportInsurances = async (data) => {
  const wb = XLSX.utils.book_new();

  const insurances = new Promise(async (resolve, reject) => {
    try {
      const payload = data;
      const aoa = [
        // ["Три имена", "Номер на кредит", "Номер на сертификат", "Статус", "Агент", "Размер на кредит", "Премия", "Пакет", "Период на застраховка", "Издаден на", "Анулиран на", "Рефинансиран"],
        ["Три имена", "ЕГН", "Номер на кредит", "Номер на сертификат", "Статус", "Агент", "Размер на кредит", "Месечна вноска", "Премия", "Пакет", "Период на застраховка", "Издаден на", "Анулиран на"],
        ...payload.map(({ fullName, pin, loanIdentifier, certificateId, user, loanAmount, loanDuration, premium, packageName, loanStartDate, loanEndDate, createdAt, cancelledAt, refinanced }) => [
          fullName,
          pin,
          loanIdentifier,
          certificateId,
          cancelledAt ? "Анулирана" : "Активна",
          user?.fullName,
          `${loanAmount} BGN`,
          `${(loanAmount / loanDuration).toFixed(2)} BGN`,
          `${premium} BGN`,
          ` ${packageName ? (packageName === "B" ? "Пакет Б" : "Пакет " + packageName) : "Пакет В"}`,
          `${moment(loanStartDate).format("DD.MM.YYYY HH:mm")} - ${moment(loanEndDate).format("DD.MM.YYYY HH:mm")} `,
          moment(createdAt).format("DD.MM.YYYY HH:mm"),
          cancelledAt ? moment(cancelledAt).format("DD.MM.YYYY HH:mm") : "-",
          // "---",
        ]),
      ];

      const ws = XLSX.utils.aoa_to_sheet(aoa);

      // Calculate maximum length of each column
      const colWidths = aoa[0].map((_, colIndex) => {
        return {
          wch: Math.max(...aoa.map((row) => (row[colIndex] ? row[colIndex].toString().length : 0))) + 2, // Add 2 for padding
        };
      });

      ws["!cols"] = colWidths;

      return resolve({ sheet: ws, sheetName: "Застраховки" });
    } catch (error) {
      return reject(error);
    }
  });

  try {
    const sheets = await Promise.all([insurances]);
    sheets.forEach(({ sheet, sheetName }) => XLSX.utils.book_append_sheet(wb, sheet, sheetName));
    XLSX.writeFile(wb, `insurances-${moment().format("DD-MM-YYYY")}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};
