"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

import { useSearch } from "@/providers/SearchProvider";

import "react-datepicker/dist/react-datepicker.css";
import LocalizeText from "./utility/LocalizeText";

export default function Search() {
  const { query, updateQuery } = useSearch();
  const [dateRange, setDateRange] = useState(query.dateRange);
  const [startDate, endDate] = dateRange;
  const [people, setPeople] = useState(query.people);

  const peopleOptions = [
    { value: 1, label: "1 Person" },
    { value: 2, label: "2 People" },
    { value: 3, label: "3 People" },
    { value: 4, label: "4 People" },
    { value: 5, label: "5 People" },
    { value: 6, label: "6 People" },
    { value: 7, label: "7 People" },
    { value: 8, label: "8 People" },
    { value: 9, label: "9 People" },
    { value: 10, label: "10+ People" },
  ];

  const onSubmit = () => {
    updateQuery({
      dateRange,
      people,
    });
    document.getElementById("search-results")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container z-10">
        <div className="flex items-center lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-base">
          <div className="relative  flex-grow lg:w-auto w-full">
            <DatePicker
              dateFormat="do MMM yyyy"
              minDate={new Date()}
              selectsRange={true}
              startDate={startDate!}
              endDate={endDate!}
              onChange={(update: any) => {
                setDateRange(update);
              }}
              placeholderText="Select Date"
              className="search__daterange lg:h-17 h-14 pr-4 lg:pl-[60px] pl-[50px] lg:text-md text-base w-full placeholder:text-dark-2 font-medium outline-none !font-sans"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-5 lg:left-base max-w-[20px] text-secondary-1">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9583 2.96669V1.66669C13.9583 1.32502 13.675 1.04169 13.3333 1.04169C12.9916 1.04169 12.7083 1.32502 12.7083 1.66669V2.91669H7.29165V1.66669C7.29165 1.32502 7.00831 1.04169 6.66665 1.04169C6.32498 1.04169 6.04165 1.32502 6.04165 1.66669V2.96669C3.79165 3.17502 2.69999 4.51669 2.53332 6.50835C2.51665 6.75002 2.71665 6.95002 2.94999 6.95002H17.05C17.2916 6.95002 17.4916 6.74169 17.4666 6.50835C17.3 4.51669 16.2083 3.17502 13.9583 2.96669Z"
                  fill="currentColor"
                />
                <path
                  d="M16.6667 8.20001C17.125 8.20001 17.5 8.57501 17.5 9.03335V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V9.03335C2.5 8.57501 2.875 8.20001 3.33333 8.20001H16.6667Z"
                  fill="currentColor"
                />
                <path
                  d="M12.3667 12.4917L11.95 12.9167H11.9417L9.41665 15.4417C9.30832 15.55 9.08332 15.6667 8.92499 15.6834L7.79998 15.85C7.39165 15.9083 7.10833 15.6167 7.16667 15.2167L7.325 14.0833C7.35 13.925 7.45832 13.7083 7.56665 13.5917L10.1 11.0667L10.5167 10.6417C10.7917 10.3667 11.1 10.1667 11.4333 10.1667C11.7167 10.1667 12.025 10.3 12.3667 10.6417C13.1167 11.3917 12.875 11.9833 12.3667 12.4917Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="relative select_style__two varient-1 flex-grow lg:w-auto w-full">
            <Select
              defaultValue={peopleOptions.find((p) => p.value === people)}
              onChange={(e: any) => setPeople(e.value)}
              options={peopleOptions}
              className="react-select-search"
              placeholder="People"
              classNamePrefix="react-select"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-5 lg:left-base max-w-[20px] text-secondary-1">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.66 8.32885C17.2489 8.32441 16.84 8.30441 16.4311 8.33552C16.1489 8.35552 15.9889 8.23552 15.8489 8.01774C15.3689 7.27552 14.8667 6.54663 14.4 5.79552C14.1178 5.33996 13.72 5.13107 13.2089 5.08441C13.1067 5.07552 13.0067 5.05107 12.9045 5.04441C12.4956 5.01329 12.0956 4.87552 11.6845 4.92663C10.5489 5.06663 9.4178 5.21774 8.28446 5.37774C7.87335 5.43552 7.58224 5.66885 7.45113 6.07107C7.20891 6.81107 6.96669 7.55552 6.7378 8.29996C6.68669 8.46441 6.62224 8.63107 6.66002 8.81552C6.74669 9.22663 7.16002 9.6333 7.52224 9.65329C8.06002 9.68441 8.44224 9.43107 8.60446 8.93107L9.09335 7.44885C9.12446 7.3533 9.14446 7.25774 9.28224 7.24663C9.54002 7.22218 9.80002 7.18218 10.0534 7.13774C10.2711 7.09774 10.3 7.16218 10.2467 7.37107C9.94669 8.51774 9.66224 9.66885 9.36891 10.8177C9.11558 11.8111 9.34891 12.4289 10.1911 13.0044C11.1778 13.6755 12.16 14.3489 13.1467 15.0155C13.3045 15.1222 13.3867 15.24 13.4178 15.4355C13.5956 16.5644 13.7845 17.6911 13.9778 18.8177C14.0778 19.4022 14.5978 19.8 15.1356 19.7133C15.7356 19.62 16.1134 19.0844 16.0134 18.4688C15.7911 17.1311 15.5645 15.7933 15.34 14.4555C15.2845 14.1355 15.1134 13.8911 14.8534 13.7044C14.1867 13.2289 13.5267 12.7422 12.8511 12.28C12.66 12.1488 12.6356 12.0222 12.68 11.82C12.9222 10.7244 13.1556 9.62663 13.3934 8.52885C13.4222 8.39552 13.4578 8.26663 13.5089 8.05329C13.8756 8.61552 14.2178 9.10441 14.5222 9.61774C14.7845 10.0622 15.1222 10.3355 15.6622 10.3266C16.3245 10.3155 16.9845 10.3266 17.6467 10.3222C18.2578 10.3177 18.7045 9.89552 18.7067 9.33107C18.7111 8.76218 18.2645 8.33552 17.66 8.32885ZM6.90891 10.2733C6.63335 10.2977 6.50891 10.4822 6.44224 10.72C6.29335 11.2666 6.13558 11.8089 6.00224 12.36C5.95113 12.5755 5.86669 12.5866 5.67113 12.54C5.12002 12.4111 4.58891 12.2044 4.17113 12.1777C3.24224 12.18 2.56891 12.6688 2.3578 13.4266C2.00002 14.7133 1.6578 16.0044 1.32002 17.2977C1.18669 17.8044 1.46891 18.2777 1.9778 18.4222C2.31558 18.5177 2.66002 18.5955 3.00002 18.6911C3.15558 18.7333 3.20669 18.6955 3.22447 18.5266C3.34891 17.3711 4.4978 16.6666 5.58446 17.0822C5.7578 17.1488 5.81558 17.1422 5.86446 16.9466C6.04446 16.2066 6.24669 15.4755 6.44224 14.74C6.7778 13.4666 7.11335 12.1911 7.44446 10.9177C7.54224 10.5355 7.29113 10.24 6.90891 10.2733ZM13.3556 4.28218C14.4489 4.28885 15.3578 3.37107 15.3556 2.26885C15.3511 1.18218 14.4467 0.277739 13.36 0.275517C12.2667 0.273295 11.3467 1.17329 11.3467 2.24663C11.3489 3.37996 12.2311 4.27774 13.3556 4.28218ZM10.4111 14.0733C9.86891 13.6911 9.24669 13.3977 8.86002 12.7377C8.34891 14.6822 7.85558 16.5577 7.36002 18.4355C7.32002 18.5933 7.30669 18.7444 7.34891 18.9022C7.47558 19.3933 7.87335 19.7177 8.35335 19.7177C8.83558 19.7177 9.22446 19.4 9.36446 18.8733L10.5445 14.4311C10.5889 14.2711 10.56 14.1777 10.4111 14.0733ZM4.97558 17.7244C4.43335 17.7177 3.97335 18.1688 3.96669 18.7089C3.96002 19.2533 4.40669 19.7111 4.95113 19.7177C5.49113 19.7266 5.95335 19.2755 5.96002 18.7333C5.96891 18.1911 5.5178 17.7288 4.97558 17.7244Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="block lg:w-auto w-full flex-grow text-center bg-primary-1 lg:h-17 h-14  font-medium text-md text-white hover:bg-secondary-1 duration-300"
          >
            <LocalizeText englishText="Show Available" croatianText="Prikaži slobodne" />
          </button>
        </div>
      </div>
    </>
  );
}
