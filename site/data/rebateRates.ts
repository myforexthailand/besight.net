export type AccountType = 'standard' | 'micro' | 'ulStandard' | 'ulMicro'

export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'micro', label: 'Micro' },
  { value: 'ulStandard', label: 'Ultra Low Standard' },
  { value: 'ulMicro', label: 'Ultra Low Micro' },
]

export type RebateRate = {
  currency: string
  standard: number
  micro: number
  ulStandard: number
  ulMicro: number
  /** Symbol as written for each account type (e.g. "GOLD#" on Ultra Low); falls back to `currency`. A rate of 0 means the symbol isn't offered on that type. */
  names?: Partial<Record<AccountType, string>>
}

export const rateSymbol = (rate: RebateRate, type: AccountType) => rate.names?.[type] ?? rate.currency

export const REBATE_RATES: RebateRate[] = [
  { currency: 'AUDUSD', standard: 1.8, micro: 0.018, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'EURUSD', standard: 1.8, micro: 0.018, ulStandard: 0.7, ulMicro: 0.007 },
  { currency: 'USDCAD', standard: 1.8, micro: 0.018, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'USDJPY', standard: 1.8, micro: 0.018, ulStandard: 0.6, ulMicro: 0.006 },
  { currency: 'GOLD', standard: 4, micro: 0.04, ulStandard: 2, ulMicro: 0.02 },
  { currency: 'XAUEUR', standard: 3.4, micro: 0.034, ulStandard: 2, ulMicro: 0.02 },
  { currency: 'AUDCAD', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'AUDCHF', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'AUDJPY', standard: 2, micro: 0.02, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'AUDNZD', standard: 2, micro: 0.02, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'CADCHF', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'CADJPY', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'CHFJPY', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'EURAUD', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'EURCAD', standard: 2, micro: 0.02, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'EURCHF', standard: 2.4, micro: 0.024, ulStandard: 2, ulMicro: 0.02 },
  { currency: 'EURDKK', standard: 2.4, micro: 0.024, ulStandard: 2, ulMicro: 0.02 },
  { currency: 'EURGBP', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'EURHKD', standard: 2.4, micro: 0.024, ulStandard: 2, ulMicro: 0.02 },
  { currency: 'EURJPY', standard: 2, micro: 0.02, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'GBPJPY', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'GBPUSD', standard: 2, micro: 0.02, ulStandard: 0.7, ulMicro: 0.007 },
  { currency: 'NZDCAD', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'NZDUSD', standard: 2, micro: 0.02, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'USDCHF', standard: 2, micro: 0.02, ulStandard: 1, ulMicro: 0.01 },
  { currency: 'USDHKD', standard: 2.4, micro: 0.024, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'EURNZD', standard: 2.4, micro: 0.024, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'GBPAUD', standard: 2.4, micro: 0.024, ulStandard: 1.4, ulMicro: 0.014 },
  { currency: 'GBPCAD', standard: 2.4, micro: 0.024, ulStandard: 1.4, ulMicro: 0.014 },
]
