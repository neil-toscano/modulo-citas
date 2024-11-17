import { Select } from "@mantine/core";
import { useProduct } from "@/provider/ProviderContext";
function SelectSection({ sectionId, setSectionId,name = "FILTRAR POR SECCION" }) {
  const { documentSection } = useProduct();
  const dataSection = documentSection.map((section) => {
    return { value: section.sectionId, label: section.sectionName };
  });
  return (
    <>
    {name === "FILTRAR POR SECCION" && <label className="flex gap-3 flex-col">
      {name}
      <Select
        data={dataSection}
        placeholder="CLICK SECCIÓN"
        value={sectionId}
        onChange={(_value, option) => setSectionId(option.value)}
      />
    </label>}
    {name === "ESTADO" && <label className="flex gap-3 flex-col">
      {name}
      <Select
      
        data={[{value:"CLOSED",label:"CERRADO"},{value:"EXPIRED",label:"EXPIRADO"},{value:"OPEN",label:"ABIERTO"} ]}
        placeholder="CLICK SECCIÓN"
        value={sectionId}
        onChange={(_value, option) => setSectionId(option.value)}
      />
    </label>}
    </>
  );
}

export default SelectSection;
