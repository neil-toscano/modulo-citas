import { useMemo } from "react";
import { useParams } from "react-router-dom";

const useFindSlug = (documentSection) => {
  const { slug } = useParams(); // Obtén el último segmento de la URL

  const findSlug = useMemo(() => {
    return documentSection.find((data) => data.sectionSlug === slug);
  }, [documentSection, slug]);

  return findSlug;
};

export default useFindSlug;
