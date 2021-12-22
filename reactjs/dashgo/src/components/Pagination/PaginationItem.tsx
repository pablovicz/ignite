import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    pageNumber: number;
    isCurrent?: boolean;
    onPageChange: (page:number) => void;
}


export function PaginationItem({ pageNumber, onPageChange, isCurrent = false }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{ bgColor: "pink.500", cursor: "default" }}
            >
                {pageNumber}
            </Button>
        );
    }

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bgColor="gray.700"
            _hover={{ bgColor: 'gray.500' }}
            onClick={() => onPageChange(pageNumber)}
        >
            {pageNumber}
        </Button>
    );
}