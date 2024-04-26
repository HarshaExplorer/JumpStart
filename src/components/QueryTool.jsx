import React, { useState, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import database from "../client";
import "../styles/menu.css";
import { motion } from "framer-motion";

const QueryTool = ({ resultSet, setResultSet, manage = false }) => {
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

    if (manage) query = query.eq("user_id", manage.user);

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
      <Stack direction="vertical" data-bs-theme="dark">
        <motion.h3
          className={`kanit-bold ${
            manage ? manage.headerMarginTop : "mt-4"
          } text-center`}
          style={{ color: "white" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {manage ? manage.header : "Discover & Bring Projects to Life."}
        </motion.h3>
        <Stack direction="horizontal" className="p-3" gap={3}>
          <Form.Select
            className="w-50 search-bar"
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
            <option value="Life Style">Life Style</option>
            <option value="Nature & Environment">Nature & Environment</option>
            <option value="Technology">Technology</option>
          </Form.Select>

          <Form.Control
            className="me-auto search-bar"
            name="search"
            type="text"
            value={searchQuery.search}
            onChange={handleFilters}
            placeholder="Search projects and businesses"
          />

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.0 }}>
            <Button variant="outline-success" onClick={handleSubmit}>
              Confirm
            </Button>
          </motion.div>
          <div className="vr" style={{ color: "white" }} />
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.0 }}>
            <Button variant="outline-danger" onClick={handleReset}>
              Reset
            </Button>
          </motion.div>
        </Stack>
        <hr style={{ borderColor: "white" }} />
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
            style={{ color: "white" }}
          />
        </div>
      </div>
    </>
  );
};

export default QueryTool;
