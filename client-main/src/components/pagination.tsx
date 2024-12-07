import { ButtonGroup, Button } from "@mui/material";
import { usePostContext } from "../context/postContext";

const Pagination = () => {
  const { currentPage, totalPages, fetchPosts } = usePostContext();

  const handlePageChange = (page: number, count: number) => {
    fetchPosts(page, count);
  };

  const count = 5;

  return (
    <ButtonGroup>
      <Button
        onClick={() => handlePageChange(currentPage - 1, count)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1, count)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
