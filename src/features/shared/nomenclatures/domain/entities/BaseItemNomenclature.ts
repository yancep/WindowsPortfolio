export interface SelectNomenclature {
  key: number | string;
  label: string;
}

export type BaseItemNomenclature = {
  id?: number | string;
  key?: number | string;
  name?: string;
  label?: string;
  value?: string;
  codename?: string;
  role?: number;
  dpa?: string;
};

export const mapItemNomenclatureToSelectNomenclature = (
  items: BaseItemNomenclature[],
): SelectNomenclature[] => {
  return items.map((e) => {
    const item: SelectNomenclature = {
      key: '',
      label: '',
    };

    if (e.id) {
      item.key = e.id;
    }
    if (e.name) {
      item.label = e.name;
    }
    if (e.value) {
      item.label = e.value;
    }

    return item;
  });
};
