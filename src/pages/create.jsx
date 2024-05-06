import React, {useState} from 'react';
import InputComponent from "../components/InputComponent";
import TextAreaComponent from "../components/TextAreaComponent";
import ImageComponent from "../components/ImageComponent";
import RadioBoxComponent from "../components/RadioBoxComponent";
import WysiwygEditorComponent from "../components/WysiwygEditorComponent";
import ExcelTableComponent from "../components/ExcelTableComponent";
import "./styles.css"
import {API_URL} from "../config";
import {Document, Page, Text, View, PDFDownloadLink} from '@react-pdf/renderer';


const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        opportunityNumber: '',
        refDossier: '',
        siretSiren: '',
        affaire: '',
        clientName: '',
        intermediary: '',
        briefDescription: '',
        descriptionImage: [],
        hasCoInsurance: 'Non',
        operationAddress: '',
        operationPlan: [],
        detailedDescription: '',
        operationCost: {
            amount1: 0, amount2: 0, totalAmount: 0,
        },
    });

    const handlePosts = async () => {
        const newformData = new FormData();
        newformData.append('numeroOpportunite', formData.opportunityNumber);
        newformData.append('referenceDossier', formData.refDossier);
        newformData.append('numeroSiretSiren', formData.siretSiren);
        newformData.append('affaire', formData.affaire);
        newformData.append('nomClient', formData.clientName);
        newformData.append('intermediaire', formData.intermediary);
        newformData.append('description', formData.briefDescription);
        newformData.append('images', formData.descriptionImage);
        newformData.append('presenceCoassurance', formData.hasCoInsurance);
        newformData.append('adresseOperation', formData.operationAddress);
        newformData.append('planAdresseOperation', formData.operationPlan);
        newformData.append('descriptifDetailleOperation', formData.detailedDescription);
        newformData.append('coutOperation[montant1]', formData.operationCost.amount1);
        newformData.append('coutOperation[montant2]', formData.operationCost.amount2);
        newformData.append('coutOperation[totalAmount]', formData.operationCost.totalAmount);


        try {
            const response = await fetch(`${API_URL}/opportunity`, {
                method: 'POST', body: newformData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission des données.');
            }

            const data = await response.json();
            console.log('Réponse de l\'API:', data);
        } catch (error) {
            console.error('Erreur:', error.message);
        }
    }

    const MyDocument = ({formData}) => {
        const {
            opportunityNumber,
            refDossier,
            siretSiren,
            affaire,
            clientName,
            intermediary,
            briefDescription,
            hasCoInsurance,
            operationAddress,
            detailedDescription,
            operationCost
        } = formData;

        return (<Document>
            <Page size="A4">
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Numéro Opportunité: {opportunityNumber}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Référence Dossier: {refDossier}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Numéro Siret/Siren: {siretSiren}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Affaire: {affaire}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Nom Client: {clientName}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Intermédiaire: {intermediary}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Description: {briefDescription}</Text>
                    {hasCoInsurance && <Text style={{fontSize: 14, marginBottom: 5}}>Présence Coassurance: Oui</Text>}
                    <Text style={{fontSize: 14, marginBottom: 5}}>Adresse Opération: {operationAddress}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Descriptif Opération:</Text>
                    <Text style={{fontSize: 12, marginBottom: 10}}>{detailedDescription}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Montant 1: {operationCost.amount1}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Montant 2: {operationCost.amount2}</Text>
                    <Text style={{fontSize: 14, marginBottom: 5}}>Montant Total: {operationCost.totalAmount}</Text>
                </View>
            </Page>
        </Document>);
    }


    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleStepSubmit = (e) => {
        console.log('Données soumises:', formData);
        handleNext();
    };

    return (<div
        className={"container"}

    >
        <h1
            className={"typo-title typo-color--axablue"}
            style={{
                textAlign: "center", margin: "20px 0", fontSize: "3rem",
            }}
        >
            Créer une opportunité
        </h1>

        <h3
            className={"typo-subtitle typo-color--axablue"}
            style={{
                textAlign: "center", margin: "20px 0", fontSize: "2rem",
            }}
        >
            {activeStep === 0 && "Informations générales"}
            {activeStep === 1 && "Informations sur le client"}
            {activeStep === 2 && "Informations sur l'opération"}
            {activeStep === 3 && "Confirmation"}

            <br/>
            <span
                style={{
                    fontSize: "1rem", color: "#000",
                }}
            >
                Étape {activeStep + 1} sur 3
            </span>
        </h3>

        <div
            style={{
                maxWidth: "600px", margin: "0 auto",
            }}
        >
            {activeStep === 0 && (<form onSubmit={handleStepSubmit}>
                <InputComponent
                    label="Numéro d’opportunité"
                    type="text"
                    name="opportunityNumber"
                    value={formData.opportunityNumber}
                    onChange={(e) => setFormData({...formData, opportunityNumber: e.target.value})}
                />
                <div
                    className={"button-nav"}
                >
                    <button type="submit" className={"button-next cta-button__btn--action"}>Suivant</button>
                </div>
            </form>)}

            {activeStep === 1 && (<form onSubmit={handleStepSubmit}>
                <InputComponent
                    label="Référence du dossier"
                    type="text"
                    name="refDossier"
                    value={formData.refDossier}
                    onChange={(e) => setFormData({...formData, refDossier: e.target.value})}
                />
                <InputComponent
                    label="Numéro SIRET SIREN"
                    type="text"
                    name="siretSiren"
                    value={formData.siretSiren}
                    onChange={(e) => setFormData({...formData, siretSiren: e.target.value})}
                />
                <InputComponent
                    label="Affaire"
                    type="text"
                    name="affaire"
                    value={formData.affaire}
                    onChange={(e) => setFormData({...formData, affaire: e.target.value})}
                />
                <InputComponent
                    label="Nom du client"
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                />
                <InputComponent
                    label="Intermédiaire (Nom + Code portefeuille)"
                    type="text"
                    name="intermediary"
                    value={formData.intermediary}
                    onChange={(e) => setFormData({...formData, intermediary: e.target.value})}
                />
                <TextAreaComponent
                    label="Description succincte"
                    name="briefDescription"
                    value={formData.briefDescription}
                    onChange={(e) => setFormData({...formData, briefDescription: e.target.value})}
                />
                <ImageComponent
                    label="Image en lien avec la description"
                    name="descriptionImage"
                    onFilesSelected={(files) => setFormData({...formData, descriptionImage: files})}
                />
                <RadioBoxComponent
                    label="Présence d’une coassurance"
                    options={[{value: 'Oui', label: 'Oui'}, {value: 'Non', label: 'Non'},]}
                    name="hasCoInsurance"
                />
                <div
                    className={"button-nav"}
                >
                    <button type="button" className={"button-return"} onClick={handleBack}>Retour
                    </button>
                    <button type="submit" className={"button-next cta-button__btn--action"}>Suivant</button>
                </div>
            </form>)}

            {activeStep === 2 && (<form onSubmit={handleStepSubmit}>
                <InputComponent
                    label="Adresse de l'opération"
                    type="text"
                    name="operationAddress"
                    value={formData.operationAddress}
                    onChange={(e) => setFormData({...formData, operationAddress: e.target.value})}
                />
                <ImageComponent
                    label="Plan de l'adresse de l'opération"
                    name="operationPlan"
                    onFilesSelected={(files) => setFormData({...formData, operationPlan: files})}

                />
                <WysiwygEditorComponent
                    label="Descriptif détaillé de l'opération"
                    name="detailedDescription"
                    onChange={(value) => setFormData({...formData, detailedDescription: value})}
                />
                <ExcelTableComponent
                    label="Coût de l'opération (tarif)"
                    name="operationCost"
                    onAddRow={(row) => setFormData({
                        ...formData, operationCost: {
                            amount1: parseFloat(formData.operationCost.amount1) + parseFloat(row.montant1),
                            amount2: parseFloat(formData.operationCost.amount2) + parseFloat(row.montant2),
                            totalAmount: parseFloat(formData.operationCost.totalAmount) + parseFloat(row.montant1) + parseFloat(row.montant2),
                        },
                    })}
                />

                <div
                    className={"button-nav"}
                >
                    <button type="button" className={"button-return"} onClick={handleBack}>Retour
                    </button>
                    <button type="button" onClick={handlePosts}
                            className={"button-next cta-button__btn--action"}>Soumettre
                    </button>
                    <button type="submit" className={"button-next cta-button__btn--action"}>
                        <PDFDownloadLink document={<MyDocument formData={formData}/>} fileName="opportunite.pdf"
                                         style={{
                                             textDecoration: "none", color: "white",
                                         }}
                        >
                            {({
                                  blob, url, loading, error
                              }) => (loading ? 'Téléchargement en cours...' : 'Télécharger PDF')}
                        </PDFDownloadLink>
                    </button>
                </div>
            </form>)}

            {activeStep === 3 && (<div>
                <h3>Formulaire soumis avec succès!</h3>
                <p>Les données ont été enregistrées.</p>
            </div>)}
        </div>
    </div>);
};

export default Create;
