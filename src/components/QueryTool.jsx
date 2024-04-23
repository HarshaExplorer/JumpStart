import React, { useState, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import database from "../client";
import "./menu.css";

const QueryTool = ({ resultSet, setResultSet }) => {
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    category: "all",
  });

  const [filterFundDesc, setFundFilter] = useState(false);

  const handleFilters = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleFundFilter = (isDesc) => {
    let sortedProjects = [];

    if (isDesc) {
      sortedProjects = [...resultSet].sort((a, b) => {
        return b.fundRatio - a.fundRatio;
      });
    } else
      sortedProjects = [...resultSet].sort((a, b) => {
        return a.fundRatio - b.fundRatio;
      });
    setResultSet(sortedProjects);
  };

  const handleSubmit = async (e) => {
    let sortedProjects = false;
    let query = database.from("projects").select();

    if (searchQuery.category !== "all")
      query = query.eq("category", `${searchQuery.category}`);

    if (searchQuery.search !== "")
      query = query.or(
        `title.ilike.%${searchQuery.search.trim()}%,company.ilike.%${searchQuery.search.trim()}%`
      );

    const { data } = await query;
    data.map((e) => {
      const diff = e.amt_requested - e.amt_pledged;
      e.fundRatio =
        diff > 0 ? Math.trunc((e.amt_pledged * 100) / e.amt_requested) : 100;
      return e;
    });

    if (filterFundDesc) {
      sortedProjects = [...data].sort((a, b) => {
        return b.fundRatio - a.fundRatio;
      });
    }

    setResultSet(sortedProjects ? sortedProjects : data);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleReset = (e) => {
    setSearchQuery({
      search: "",
      category: "all",
    });

    handleSubmit();
  };

  return (
    <>
      <Stack direction="vertical">
        <h3 className="kanit-bold mt-4 text-center query-tool-text">
          Discover & Bring Projects to Life.
        </h3>
        <Stack direction="horizontal" className="p-3" gap={3}>
          <Form.Select
            className="w-50 filter-border query-tool-text"
            name="category"
            value={searchQuery.category}
            onChange={handleFilters}
          >
            <option value="all">Select Category</option>
            <option value="Art">Art & Crafts</option>
            <option value="Books">Books</option>
            <option value="Games">Games</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Film">Films</option>
          </Form.Select>

          <Form.Control
            className="me-auto filter-border query-tool-text"
            name="search"
            type="text"
            value={searchQuery.search}
            onChange={handleFilters}
            placeholder="Search projects and businesses"
          />

          <Button
            variant="outline-success"
            onClick={handleSubmit}
            className="query-tool-text"
          >
            Submit
          </Button>
          <div className="vr" />
          <Button
            variant="outline-danger"
            onClick={handleReset}
            className="query-tool-text"
          >
            Reset
          </Button>
        </Stack>
        <hr className="query-tool-text" />
      </Stack>

      <div className="d-flex flex-row-reverse">
        <div className="p-3">
          <Form.Check
            type="switch"
            onChange={(e) => {
              setFundFilter(e.target.checked);
              handleFundFilter(e.target.checked);
            }}
            label="Most Funded"
            className="query-tool-text"
          />
        </div>
      </div>
    </>
  );
};

export default QueryTool;
