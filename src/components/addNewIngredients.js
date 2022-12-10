import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { FileUploader } from "react-drag-drop-files";
import { Button, FloatingLabel } from 'react-bootstrap';
import ReceiptsDataService from "../services/receipts";

const AddNewIngredients = () => {

    const formik = useFormik({
        initialValues: {
            ingredients: [
                { name: "TOMATO", category: { vegetable: "TOMATO", meat: null, other: null }, img: null, quantity: 0 },
                { name: "POTATO", category: { vegetable: "POTATO", meat: null, other: null }, img: null, quantity: 0 },
                { name: "CARROT", category: { vegetable: "CARROT", meat: null, other: null }, img: null, quantity: 0 },
                { name: "GARLIC", category: { vegetable: "GARLIC", meat: null, other: null }, img: null, quantity: 0 },
                { name: "EGGPLANT", category: { vegetable: "EGGPLANT", meat: null, other: null }, img: null, quantity: 0 },
                { name: "ONION", category: { vegetable: "ONION", meat: null, other: null }, img: null, quantity: 0 },
                { name: "FISH", category: { meat: "FISH", vegetable: null, other: null }, img: null, quantity: 0 },
                { name: "MEAT", category: { meat: "MEAT", vegetable: null, other: null }, img: null, quantity: 0 },
                { name: "CHICKEN", category: { meat: "CHICKEN", vegetable: null, other: null }, img: null, quantity: 0 },
                { name: "CHEESE", category: { other: "CHEESE", vegetable: null, meat: null }, img: null, quantity: 0 },
                { name: "EGG", category: { other: "EGG", vegetable: null, meat: null }, img: null, quantity: 0 },
                { name: "BREAD", category: { other: "BREAD", vegetable: null, meat: null }, img: null, quantity: 0 }
            ]
        },
        onSubmit: values => {
        },
    });



    const formik2 = useFormik({
        initialValues: {
            name: "",
            description: "",
            duration: 0,
        },
        validate: (formValues) => {
            const errors = {}
            if (!formValues.name)
                errors.name = true
            if (!formValues.description)
                errors.description = true
            if (!formValues.duration)
                errors.duration = true
            return errors
        },
        isInitialValid: false,
        onSubmit: values => {
            setStep(1)
        },
    });



    const [step, setStep] = useState(0);




    const {
        values,
    } = formik;


    const handleAddReceipt = () => {
        formik.handleSubmit()
        const dataToSend = {
            ...formik.values,
            ...formik2.values
        }

        console.log("dataToSend", dataToSend)

        ReceiptsDataService.create(dataToSend)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    }

    const handleAnalyseReceipt = () => {
        formik.handleSubmit()

        console.log("===values===", values)
    }
    return (
        <div>
            {step === 0 && (<div className='row'>
                <div className='col-md-12'>
                    <h2>Fiche Recettes</h2>
                </div>
                <div className='col-md-12'>
                    {JSON.stringify()}
                    <Form onSubmit={formik2.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>le titre de la recette:
                            </Form.Label>
                            <Form.Control type="text"
                                placeholder="titre" value={formik2.values.fullname}
                                onChange={formik2.handleChange}
                                name="name"
                            />
                            <Form.Label>Durée de la recette:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="min"
                                name="duration"
                                value={formik2.values.duration}
                                onChange={formik2.handleChange}
                            />
                            <Form.Label>Description de la recette:
                            </Form.Label>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    type="text"
                                    placeholder="description"
                                    name="description"
                                    value={formik2.values.description}
                                    onChange={formik2.handleChange}
                                    as="textarea"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Button className='mx-auto' variant="primary" type="submit" disabled={!formik2.isValid}>
                            liste des ingrédients
                        </Button>
                    </Form>
                </div>
            </div>)}
            {step === 1 && (<div className='row'>
                <div className='col-md-12'>
                    <h2>liste des ingrédients</h2>
                    <FormikProvider value={formik}>
                        <form>
                            <FieldArray name="ingredients">
                                <div className='row'>
                                    {values.ingredients.length > 0 &&
                                        values.ingredients.map((ingredient, index) => (
                                            <div className="col-md-3" key={index}>
                                                <Form.Group controlId="formGridName" className='mb-3'>
                                                    <Form.Label>{ingredient.name}</Form.Label>
                                                    <Form.Control
                                                        placeholder="Quantité"
                                                        type="number"
                                                        name={`ingredients[${index}].quantity`}
                                                        value={values.ingredients[index].quantity}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}

                                                    />

                                                </Form.Group>
                                                <FileUploader
                                                    className="file-uploader"
                                                    multiple={false}
                                                    types={["JPEG", "PNG", "GIF"]}
                                                    name={`ingredients[${index}].img`}
                                                    value={values.ingredients[index].img}
                                                    handleChange={(e) => {
                                                        formik.setFieldValue(`ingredients[${index}].img`, e)
                                                    }}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </FieldArray>
                            <div className='row mt-5'>
                                <div className='col-md-12 mx-auto text-center'>
                                    <button type="button" onClick={handleAddReceipt} className="btn btn-primary add-to-receipt">Ajouter la recette</button>
                                    <button type="button" onClick={handleAnalyseReceipt} className="btn btn-primary mr-1">Analyser la recette</button>
                                </div>
                            </div>
                        </form>
                    </FormikProvider>

                </div>
            </div>)
            }
        </div>)
}

export default AddNewIngredients;