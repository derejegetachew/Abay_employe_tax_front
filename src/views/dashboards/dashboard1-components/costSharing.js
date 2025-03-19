import React, { useEffect, useState } from "react";
import numeral from "numeral";
import * as XLSX from "xlsx";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { get_branch_tax_report, month_list } from "../../../services/taxapi";
import {
  ERP_Branch_List,
  Addis_Branch_List,
  Branch_fc_code,
} from "../../../services/erpBranchapi";
import { currentUser } from "../../../utils/tokenUtils";
import { head_office_fc_code } from "../../../utils/constants";
import toast from "react-hot-toast";

const TaxReport = () => {
  const user = currentUser();
  const branch = user.branch_id;
  const location = useLocation();
  const stateData = location.state;
  const currentDate = new Date();
  const currentmonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let currentMonth = `${currentmonth}/${currentYear}`;
  if (stateData !== null) {
    const year = stateData.year;
    const month = stateData.month;
    currentMonth = `${month}/${year}`;
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [data, setData] = useState([]);
  const [fc_code, setFcCode] = useState(null);
  const [branchNamesMap, setBranchNamesMap] = useState({}); // To store branch names

  useEffect(() => {
    const fetchFcCode = async () => {
      try {
        const fccode = await Branch_fc_code(branch);
        setFcCode(fccode);
      } catch (error) {
        console.error("Error fetching fc_code:", error);
      }
    };

    if (branch) {
      // Ensure branch is valid before fetching
      fetchFcCode();
    }
  }, [branch]);

  useEffect(() => {
    const fetchBranchNames = async () => {
      try {
        const branches = await Addis_Branch_List(); // Fetch all branches
        const branchMap = {};
        branches.forEach((branch) => {
          branchMap[branch.fc_code] = branch.name;
        });
        branchMap[head_office_fc_code] = "Head Office"; // Add Head Office manually
        setBranchNamesMap(branchMap);
      } catch (error) {
        console.error("Error fetching branch names:", error);
      }
    };

    fetchBranchNames();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (fc_code && currentMonth) {
        // Only fetch if both are valid
        try {
          const data = await get_branch_tax_report(
            fc_code.fc_code,
            currentMonth
          );
          setData(data);
        } catch (error) {
          console.error("Error fetching branch tax report:", error);
        }
      }
    };
    fetchData();
  }, [fc_code, currentMonth]);

  useEffect(() => {
    const fetchBranchOptions = async () => {
      const options = await BranchOptionsList();
      setBranchOptions(options);
    };
    fetchBranchOptions();
  }, []);

  useEffect(() => {
    const fetchMonthOptions = async () => {
      const options = await monthOptionsList();
      setMonthOptions(options);
    };
    fetchMonthOptions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleBranchChange = (event, value) => {
    setSelectedBranch(value);
  };

  const BranchOptionsList = async () => {
    try {
      const data = await Addis_Branch_List(); // Fetch the branch list
      const branches = data.map((branch) => ({
        id: branch.fc_code,
        name: branch.name,
      }));
      branches.unshift({
        id: head_office_fc_code,
        name: "Head Office",
      });
      branches.unshift({
        id: "all", // A unique identifier for the "All" option
        name: "All Branches", // Display name for the "All" option
      });
      return branches;
    } catch (error) {
      console.error("Error fetching branch list:", error);
      throw error;
    }
  };

  const monthOptionsList = async () => {
    const data = await month_list();
    const months = data.map((month) => ({
      month: month.month,
    }));
    return months;
  };

  const handleSearch = async () => {
    try {
      if (!selectedBranch || !selectedMonth) {
        toast.error("Please select both branch and month");
        return;
      }
      let branch = null;
      if (selectedBranch.id !== "all") {
        branch = selectedBranch.id;
      }

      const data = await get_branch_tax_report(branch, selectedMonth);
      if (data.length === 0) {
        toast.error("There is no data for the selected branch and month");
        return;
      }
      setData(data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching data");
    }
  };

  const handleExport = () => {
    const headers = [
      "Employee Name",
      "Basic Salary",
      "costSharing 10%",
      "Branch Code",
      "Branch Name",
      "date",
    ];
    const newdata = [
      headers,
      ...data.map((item) => [
        item.fullName,
        item.salary,
        item.costSharing,
        item.branch,
        branchNamesMap[item.branch] || "Unknown Branch", // Add branch name here
        item.month,
      ]),
    ];
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(newdata);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Generate an Excel file
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Save the Excel file
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "export.xlsx";
    if (navigator.msSaveBlob) {
      // For IE 10 and above
      navigator.msSaveBlob(blob, fileName);
    } else {
      // For other browsers
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="flex" alignItems="right" gap={2}>
          <Autocomplete
            value={selectedBranch}
            onChange={handleBranchChange}
            options={branchOptions}
            getOptionLabel={(option) => option.name || "select Branch"}
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: "200px" }}
          />
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            sx={{ width: "200px" }}
          >
            <MenuItem value="">Select Month</MenuItem>
            {monthOptions.map((option) => (
              <MenuItem key={option.month} value={option.month}>
                {option.month}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box ml={2}>
          <Button onClick={handleSearch} variant="contained" color="success">
            Search
          </Button>
        </Box>
        <Box ml={2}>
          <Button
            onClick={handleExport}
            startIcon={<PrintIcon />}
            variant="contained"
            color="secondary"
          >
            Export
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  #
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  align="```javascript
              left"
                  color="textSecondary"
                  variant="h6"
                >
                  Employee Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  salary
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Cost_sharing 10%
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Branch Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Branch Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Month
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((emp) => emp.cost_sharing === "yes")
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <Typography variant="h6">
                      {page * rowsPerPage + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{emp.fullName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {numeral(emp.salary).format("0,0.00")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {numeral(emp.costSharing).format("0,0.00")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{emp.branch}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {branchNamesMap[emp.branch] || "Unknown Branch"}{" "}
                      {/* Display branch name */}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{emp.month}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};
export default TaxReport;
