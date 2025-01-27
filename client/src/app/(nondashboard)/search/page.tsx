"use client"

import Loading from '@/src/components/Loading';
import { useGetCoursesQuery } from '@/src/state/api';
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion';
import CourseCardSearch from '@/src/components/CourseCardSearch';
import SelectedCourse from './SelectedCourse';
import Toolbar from '@/src/components/Toolbar';

const Search = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data: courses, isLoading, isError } = useGetCoursesQuery({});
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const router = useRouter();

    useEffect(() => {
        if (courses) {
            if (id) {
                const course = courses.find((c) => c.courseId === id);
                setSelectedCourse(course || courses[0]);
            } else {
                setSelectedCourse(courses[0]);
            }
        }
    }, [courses, id]);

    const filteredCourses = useMemo(() => {
        if (!courses) return [];
    
        return courses.filter((course) => {
          const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === "all" || course.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
    }, [courses, searchTerm, selectedCategory]);
    
    // Automatically set the first course as the selected course when filtering
    useEffect(() => {
        if (filteredCourses.length > 0) {
            setSelectedCourse(filteredCourses[0]);
        }
    }, [filteredCourses]);

    if (isLoading) return <Loading />

    if (isError || !courses) return <div>Failed to fetch courses</div>

    const handleCourseSelect = (course: Course) => {
        setSelectedCourse(course);
        router.push(`/search?id=${course.courseId}`, { scroll: false });
    }

    const handleEnrollNow = (courseId: string) => {
        router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`,
            { scroll: false }
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='search'
        >
            <h1 className='search__title'>List of available courses</h1>
            <h2 className='search__subtitle'>{filteredCourses.length} courses available</h2>
            <Toolbar
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                currentPage='search'
            />
            <div className='search__content'>
                <motion.div
                    key={`${searchTerm}-${selectedCategory}`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='search__courses-grid'
                >
                    {filteredCourses.map((course) => (
                        <CourseCardSearch
                            key={course.courseId}
                            course={course}
                            onClick={() => handleCourseSelect(course)}
                            isSelected={selectedCourse?.courseId === course.courseId}
                        />
                    ))}
                </motion.div>

                {selectedCourse && (
                    <motion.div
                        key={selectedCourse.courseId}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className='search__selected-course'
                    >
                        <SelectedCourse 
                            course={selectedCourse}
                            handleEnrollNow={handleEnrollNow}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default Search