import { Stack, Button, Box } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";



export function Pagination() {
    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justifyContent="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
                <PaginationItem pageNumber={1} isCurrent />
                {[2, 3, 4, 5, 6, 7, 8].map(page => (
                    <PaginationItem key={page} pageNumber={page}/>
                )
                )}
            </Stack>

        </Stack>
    );
}