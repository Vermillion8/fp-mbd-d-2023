import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Staff", "Job", "Status", "Age", "Salary", " "];

function DialogEntry() {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    id: "default",
    name: "",
    job: "",
    status: "Idle",
    age: "",
    phoneNumber: "",
    email: "",
    gender: "",
    salary: Math.floor(Math.random() * (3000000 - 2000000 + 1)) + 2000000,
  });

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend
    fetch("http://localhost:3000/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        // Handle any further actions or updates based on the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
    // Reset the form data
    setFormData({
      name: "",
      job: "",
      age: "",
      phoneNumber: "",
      email: "",
      gender: "",
    });
    // Close the dialog
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        className="flex items-center gap-3"
        color="teal"
        size="sm"
        onClick={handleOpen}
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add staff
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add staff</DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {/* <Textarea label="Message" /> */}
            <Input
              label="Job"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
            />
            <Input
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            add
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}

function DialogEdit() {

}

export default function Example() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#d1c4e9';
  });

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/staff"); // Replace with your API endpoint
        const data = response.data;
        setStaff(data.results);
        console.log(data.results); // Log the fetched data in the console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(staff);

  return (
    <Card className="h-auto w-auto px-16 py-4 mx-32 my-16">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Staff list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all staff members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" color="blue-gray" size="sm">
              view all
            </Button>
            <DialogEntry />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map(
              (
                {
                  staff_id,
                  staff_name,
                  staff_email,
                  staff_job,
                  staff_age,
                  staff_status,
                  staff_salary,
                  staff_phone,
                },
                index
              ) => {
                const isLast = index === staff.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={staff_id} className="even:bg-blue-gray-50/50">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="https://www.freecodecamp.org/news/content/images/size/w60/2022/03/deee.jpg"
                          alt={staff_name}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {staff_name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {staff_email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {staff_job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {staff_phone}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          // value={online ? "online" : "offline"}
                          // color={online ? "green" : "blue-gray"}
                          value={staff_status}
                          color={
                            staff_status === "Idle"
                              ? "green"
                              : staff_status === "Occupied"
                              ? "blue-gray"
                              : null
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staff_age}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {/* <Tooltip content="Edit User">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> */}
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staff_salary}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
