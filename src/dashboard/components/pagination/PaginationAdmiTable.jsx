import { Group, Pagination } from "@mantine/core";

function PaginationAdmiTable({
  pageSize,
  totalPages,
  activePage,
  setPage,
  navigate,
  fromDate,
  toDate,
  sectionId,
  nameUrl
}) {
  const handlePagination = (e) => {
    setPage(e);
    const url = `/dashboard/administrador/${nameUrl}`;

    if ((fromDate && toDate) && !sectionId) {
      // setPage(1);
      navigate(
        `${url}?pageSize=${pageSize}&page=${e}&fromDate=${fromDate}&toDate=${toDate}`
      );
      return;
    }
    if (fromDate && toDate && sectionId) {
      // setPage(1);
      navigate(
        `${url}?pageSize=${pageSize}&page=${e}&section=${sectionId}&fromDate=${fromDate}&toDate=${toDate}`
      );
      return;
    }
    if ((!fromDate && !toDate) && sectionId) {
      // setPage(1);
      navigate(`${url}?pageSize=${pageSize}&page=${e}&section=${sectionId}`);
      return;
    }

    navigate(
      `/dashboard/administrador/${nameUrl}?pageSize=${pageSize}&page=${e}`
    );
  };
  
  return (
    <Pagination.Root
      total={totalPages}
      value={activePage}
      onChange={(e) => handlePagination(e)}
      color="#F1A405"
      className="mt-4"
    >
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
}
export default PaginationAdmiTable;
