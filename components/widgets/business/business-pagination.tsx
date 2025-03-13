import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";

const paginationItemformat = "bg-card text-card-foreground rounded-lg";
export const BusinessPaginate = ({
  activePage,
  maxPages,
  onPageChange,
}: {
  activePage: number;
  maxPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={paginationItemformat}>
          <PaginationPrevious
            className={activePage === 1 ? "" : undefined}
            onClick={() => {
              if (activePage > 1) {
                onPageChange(activePage - 1);
              }
            }}
          />
        </PaginationItem>

        {/* Dynamic Pagination Links */}
        {maxPages > 10 ? (
          <>
            {Array.from({ length: 3 }, (_, index) => {
              let page =
                activePage <= maxPages - 5
                  ? activePage + index
                  : maxPages - 5 + index;

              if (page >= 1 && page < maxPages - 2) {
                return (
                  <PaginationItem key={index} className={paginationItemformat}>
                    <PaginationLink
                      isActive={activePage === page}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationEllipsis />

            {/* Show last 3 pages */}
            {Array.from({ length: 3 }, (_, index) => {
              const page = maxPages - 2 + index;
              if (page >= maxPages - 2 && page <= maxPages) {
                return (
                  <PaginationItem key={index} className={paginationItemformat}>
                    <PaginationLink
                      isActive={activePage === page}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}
          </>
        ) : (
          // If maxPages <= 5, show all pages
          Array.from({ length: maxPages }, (_, index) => (
            <PaginationItem key={index} className={paginationItemformat}>
              <PaginationLink
                isActive={activePage === index + 1}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        )}

        <PaginationItem className={paginationItemformat}>
          <PaginationNext
            className={activePage === maxPages ? "" : undefined}
            onClick={() => {
              if (activePage < maxPages) {
                onPageChange(activePage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
