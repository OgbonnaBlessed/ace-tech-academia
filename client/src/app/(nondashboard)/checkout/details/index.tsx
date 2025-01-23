"use client";

import CoursePreview from '@/src/components/CoursePreview';
import { CustomFormField } from '@/src/components/CustomFormField';
import Loading from '@/src/components/Loading'
import { Button } from '@/src/components/ui/button';
import { useCurrentCourse } from '@/src/hooks/useCurrentCourse'
import { GuestFormData, guestSchema } from '@/src/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Form } from '@/src/components/ui/form'
import { useForm } from 'react-hook-form';
import SignUpComponent from '@/src/components/SignUp';
import SignInComponent from '@/src/components/SignIn';

const CheckoutDetailsPage = () => {
    const { course: selectedCourse, isLoading, isError } = useCurrentCourse()
    const searchParams = useSearchParams();
    const showSignUp = searchParams.get("showSignUp") === "true";

    const methods = useForm<GuestFormData>({
        resolver: zodResolver(guestSchema),
        defaultValues: {
            email: "",
        }
    })

    if (isLoading) return <Loading />
    if (isError) return <div>Failed to fetch course data</div>
    if (!selectedCourse) return <div>Course not found</div>

    return (
        <div className='checkout-details'>
            <div className='checkout-details__container'>
                <div className='checkout-details__preview'>
                    <CoursePreview course={selectedCourse} />
                </div>

                {/* Stretch feature */}
                <div className='checkout-details__options'>
                    <div className='checkout-details__guest'>
                        <h2 className='checkout-details__title'>Guest Checkout</h2>
                        <p className='checkout-details__subtitle'>
                            Enter email to receive access details and order confirmation. You can create an accout after purchase.
                        </p>
                        <Form {...methods}>
                            <form
                                onSubmit={methods.handleSubmit((data) => {
                                    console.log(data);
                                })}
                                className='checkout-details__form'
                            >
                                <CustomFormField 
                                    name='email'
                                    label='Email address'
                                    type='email'
                                    className='w-full rounded mt-4'
                                    labelClassName='font-normal text-white-50'
                                    inputClassName='py-3'
                                />
                                <Button
                                    type="submit"
                                    className='checkout-details__submit'
                                >
                                    Continue as Guest
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <div className='checkout-details__divider'>
                        <hr className='checkout-details__divider-line'/>
                        <span className='checkout-details__divider-text'>Or</span>
                        <hr className='checkout-details__divider-line'/>
                    </div>

                    <div className='checkout-details__auth'>
                        {showSignUp ? <SignUpComponent /> : <SignInComponent />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutDetailsPage