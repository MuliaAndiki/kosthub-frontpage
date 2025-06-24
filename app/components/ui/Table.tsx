"use client";
import * as React from "react";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import { CostumTableProps } from "@/app/types/ui";
import Container from "./Container";
import { useState, useCallback, useEffect } from "react";

export default function Table({
  columns,
  fetchRows,
  height,
}: CostumTableProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryOptions, setQueryOptions] = useState({});
  const [rows, setRows] = React.useState<any[]>([]);

  const handleFilterChange = useCallback((filterModel: GridFilterModel) => {
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchRows(queryOptions);
      setRows(result.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [queryOptions, fetchRows]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <Container style={{ height, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        filterMode="server"
        onFilterModelChange={handleFilterChange}
        loading={isLoading}
        disableRowSelectionOnClick
      />
    </Container>
  );
}
