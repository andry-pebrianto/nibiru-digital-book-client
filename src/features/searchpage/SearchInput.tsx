import { Fragment, useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useFetchListGenre } from "../../hooks/useListGenre";
import { Genre } from "../../types";

const { Search } = Input;

export default function SearchInput() {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>("");

  const { isLoading: isLoadingGenre, data: genres } = useFetchListGenre();

  const submitSearchFilter = (search: string) => {
    let url = location.pathname;

    if (!searchFilter && genreFilter) url += `?genreFilter=${genreFilter}`;
    else if (!searchFilter && !genreFilter) url += "";
    else if (genreFilter)
      url += `?searchFilter=${search}&genreFilter=${genreFilter}`;
    else if (!genreFilter) url += `?searchFilter=${search}`;

    navigate(url);
  };

  const submitGenreFilter = (genre: string) => {
    let url = location.pathname;

    if (!genre && searchFilter) url += `?searchFilter=${searchFilter}`;
    else if (!searchFilter && !genre) url += "";
    else if (searchFilter)
      url += `?searchFilter=${searchFilter}&genreFilter=${genre}`;
    else if (!searchFilter) url += `?genreFilter=${genre}`;

    navigate(url);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    setSearchFilter(queryParams.get("searchFilter") || "");
    setGenreFilter(queryParams.get("genreFilter") || "");
  }, [queryParams]);

  return (
    <Fragment>
      <div className="text-center mb-12">
        <Search
          placeholder="Search By Title, Price, or Author"
          allowClear
          enterButton={<FaSearch />}
          size="large"
          onSearch={() => submitSearchFilter(searchFilter)}
          onChange={(e) => setSearchFilter(e.target.value)}
          value={searchFilter}
          className="max-w-80 sm:max-w-md md:max-w-lg mx-2 mb-4"
        />

        <Select
          style={{ width: 200 }}
          onChange={(genreFilterValue) => submitGenreFilter(genreFilterValue)}
          value={genreFilter}
          showSearch
          optionFilterProp="children"
          filterOption={filterOption}
          loading={isLoadingGenre}
          options={
            genres
              ? [
                  { value: "", label: "All Genre" },
                  ...genres.data.map((genre: Genre) => ({
                    label: genre.title,
                    value: genre.title,
                  })),
                ]
              : []
          }
          size="large"
          className="mx-2"
        />
      </div>
    </Fragment>
  );
}
