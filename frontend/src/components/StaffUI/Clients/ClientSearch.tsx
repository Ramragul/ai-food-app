import {
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const ClientSearch = ({
    value,
    onChange
}: Props) => {

    return (

        <InputGroup>

            <InputLeftElement>

                <SearchIcon color="gray.400" />

            </InputLeftElement>

            <Input
                placeholder="Search by name, email or mobile"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

        </InputGroup>

    );

};

export default ClientSearch;