import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { courseCategories } from "@/src/lib/utils";

const Toolbar = ({ onSearch, onCategoryChange, currentPage }: ToolbarProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="toolbar">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search courses"
                className={`toolbar__search 
                    ${ currentPage === "search" ? "toolbar__search--searchPage" : "" }`
                }
            />
            <Select onValueChange={onCategoryChange}>
                <SelectTrigger
                    className={`toolbar__select 
                        ${ currentPage === "search" ? "toolbar__select--searchPage" : "" }`
                    }
                >
                <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg">
                <SelectItem 
                    value="all" 
                    className="toolbar__select-item"
                >
                    All Categories
                </SelectItem>
                    {courseCategories.map((category) => (
                        <SelectItem
                            key={category.value}
                            value={category.value}
                            className="toolbar__select-item"
                        >
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Toolbar;