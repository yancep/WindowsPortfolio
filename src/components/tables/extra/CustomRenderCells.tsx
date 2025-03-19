import { formatPhone } from '@/src/components/inputs/customs/CustomPhoneInput';
import { formatBankAccount } from '@/src/components/inputs/customs/CustomBankAcountInput';

export const NOT_SPECIFIED_FIELD = 'No especificado';

export function RenderPhone({ phone }: { phone: string | null | undefined }) {
  return <>{phone ? formatPhone(phone) : NOT_SPECIFIED_FIELD}</>;
}

export function RenderWebSite({ web }: { web: string | null | undefined }) {
  return <>{web ? web : NOT_SPECIFIED_FIELD}</>;
}

export function RenderBankAccount({
  bankAccount,
}: {
  bankAccount: string | null | undefined;
}) {
  return (
    <>{bankAccount ? formatBankAccount(bankAccount) : NOT_SPECIFIED_FIELD}</>
  );
}

export function RenderWage({ wage }: { wage: string | null | undefined }) {
  return <>{wage ? formatNumber(wage) : NOT_SPECIFIED_FIELD}</>;
}

export function formatNumber(
  number: number | string | null | undefined,
): string {
  if (!number && number !== 0) return '0.00';

  const numStr = String(number).trim();
  const numWithoutCommas = numStr.replace(/,/g, '');

  // Separar la parte entera y la parte decimal
  let [integerPart, decimalPart] = numWithoutCommas.split('.');

  // Tratar los casos en los que no haya parte decimal
  if (!decimalPart) {
    decimalPart = '00'; // Agregar .00 si no hay parte decimal
  } else {
    decimalPart = decimalPart.slice(0, 2); // Truncar la parte decimal a dos dígitos
  }

  // Formatear la parte entera con separadores de miles
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Unir la parte entera y la parte decimal
  return `${integerPart}.${decimalPart}`;
}

export function RenderValuesName(name: string | null | undefined) {
  return <span>{name ?? NOT_SPECIFIED_FIELD}</span>;
}

export function RenderValueOrNull({
  value,
}: {
  value: string | number | null;
}) {
  return <span>{!value ? ' - ' : value}</span>;
}
