/** @jsx jsx **/
import { jsx, css } from "@emotion/react";

import { lightTheme } from "../bloomMaterialUITheme";
import * as React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { storiesOf } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import { StorybookContext } from "../.storybook/StoryBookContext";
import { SelectedTemplatePageControls } from "./selectedTemplatePageControls";
import TemplateBookPages from "./TemplateBookPages";
import PageThumbnail from "./PageThumbnail";
import { getTemplatePageImageSource, IGroupData } from "./PageChooserDialog";
import { TemplateBookErrorReplacement } from "./TemplateBookErrorReplacement";

// ENHANCE: Could we make this have the exact same dimensions the browser dialog would have?
addDecorator(storyFn => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={lightTheme}>
            <StorybookContext.Provider value={true}>
                {storyFn()}
            </StorybookContext.Provider>
        </ThemeProvider>
    </StyledEngineProvider>
));

const PreviewFrame: React.FC = props => (
    <div
        css={css`
            height: 540px;
            display: flex;
        `}
    >
        <div
            css={css`
                color: blue;
                order: 2;
                max-width: 100px;
                border: 1px solid blue;
            `}
        >
            Don't forget that Bloom needs to be running for the api to work.
        </div>
        <div
            css={css`
                height: 98%;
                width: 420px;
                border: 1px solid blue;
                box-sizing: border-box;
                display: flex;
            `}
        >
            {props.children}
        </div>
    </div>
);

storiesOf("Page Chooser", module)
    .add("normal preview", () => {
        const templateFolderUrl =
            "c:\\bloomdesktop\\output\\browser\\templates\\template books\\basic book";
        const pageLabel = "Picture on Left";
        const orientation = "portrait";
        return (
            <PreviewFrame>
                <SelectedTemplatePageControls
                    caption={pageLabel}
                    pageDescription="A text box on top of an image"
                    imageSource={getTemplatePageImageSource(
                        templateFolderUrl,
                        pageLabel,
                        orientation
                    )}
                    enterpriseAvailable={true}
                    pageIsDigitalOnly={false}
                    pageId="1235"
                    templateBookPath="somePath"
                    isLandscape={false}
                ></SelectedTemplatePageControls>
            </PreviewFrame>
        );
    })
    .add("preview requiresEnterprise", () => {
        const templateFolderUrl =
            "c:\\bloomdesktop\\output\\browser\\templates\\template books\\activity";
        const pageLabel = "Choose Picture from Word";
        const orientation = "landscape";
        return (
            <PreviewFrame>
                <SelectedTemplatePageControls
                    caption={pageLabel}
                    pageDescription="Some page description for a page that needs Enterprise"
                    imageSource={getTemplatePageImageSource(
                        templateFolderUrl,
                        pageLabel,
                        orientation
                    )}
                    pageIsEnterpriseOnly={true}
                    enterpriseAvailable={false}
                    pageIsDigitalOnly={true}
                    pageId="1235"
                    templateBookPath="somePath"
                    learnMoreLink="some-strange-link"
                    isLandscape={true}
                ></SelectedTemplatePageControls>
            </PreviewFrame>
        );
    })
    .add("preview changeLayoutWillLoseData", () => {
        const templateFolderUrl =
            "c:\\bloomdesktop\\output\\browser\\templates\\template books\\basic book";
        const pageLabel = "Just Text";
        const orientation = "landscape";

        return (
            <PreviewFrame>
                <SelectedTemplatePageControls
                    imageSource={getTemplatePageImageSource(
                        templateFolderUrl,
                        pageLabel,
                        orientation
                    )}
                    caption="Just Text"
                    pageDescription="This page has space for only text. But I want to put a bigger description in here to make sure."
                    enterpriseAvailable={true}
                    pageIsDigitalOnly={false}
                    pageId="1235"
                    templateBookPath="somePath"
                    forChangeLayout={true}
                    willLoseData={true}
                    isLandscape={true}
                ></SelectedTemplatePageControls>
            </PreviewFrame>
        );
    })
    .add("TemplateBookPages", () => {
        const urls: IGroupData = {
            templateBookFolderUrl:
                "c:/bloomdesktop/output/browser/templates/template books/basic book",
            templateBookPath:
                "c:/bloomdesktop/output/browser/templates/template books/basic book/basic book.html"
        };
        return (
            <PreviewFrame>
                <TemplateBookPages
                    firstGroup={false}
                    groupUrls={urls}
                    orientation="portrait"
                    forChooseLayout={false}
                    onTemplatePageSelect={() => {}}
                    onTemplatePageDoubleClick={() => {}}
                />
            </PreviewFrame>
        );
    })
    .add("TemplateBookPages-activity-portrait", () => {
        const urls: IGroupData = {
            templateBookFolderUrl:
                "c:/bloomdesktop/output/browser/templates/template books/activity",
            templateBookPath:
                "c:/bloomdesktop/output/browser/templates/template books/activity/activity.html"
        };
        return (
            <PreviewFrame>
                <TemplateBookPages
                    firstGroup={false}
                    groupUrls={urls}
                    orientation="portrait"
                    forChooseLayout={false}
                    onTemplatePageSelect={() => {}}
                    onTemplatePageDoubleClick={() => {}}
                />
            </PreviewFrame>
        );
    })
    .add("TemplateBookPages-activity-landscape", () => {
        const urls: IGroupData = {
            templateBookFolderUrl:
                "c:/bloomdesktop/output/browser/templates/template books/activity",
            templateBookPath:
                "c:/bloomdesktop/output/browser/templates/template books/activity/activity.html"
        };
        return (
            <PreviewFrame>
                <TemplateBookPages
                    firstGroup={false}
                    groupUrls={urls}
                    orientation="landscape"
                    forChooseLayout={true}
                    onTemplatePageSelect={() => {}}
                    onTemplatePageDoubleClick={() => {}}
                />
            </PreviewFrame>
        );
    })
    .add("TemplateBookPages-custom", () => {
        const urls: IGroupData = {
            templateBookFolderUrl:
                "c:/users/gordon/documents/bloom/sokoro books test/gaadi template",
            templateBookPath:
                "c:/users/gordon/documents/bloom/sokoro books test/gaadi template/gaadi template.htm"
        };
        return (
            <PreviewFrame>
                <TemplateBookPages
                    firstGroup={false}
                    groupUrls={urls}
                    orientation="portrait"
                    forChooseLayout={false}
                    onTemplatePageSelect={() => {}}
                    onTemplatePageDoubleClick={() => {}}
                />
            </PreviewFrame>
        );
    })
    .add("TemplateBookErrorReplacement", () => (
        <PreviewFrame>
            <TemplateBookErrorReplacement templateBookPath="Some bizarre location/My messed up Template/My messed up Template.htm" />
        </PreviewFrame>
    ))
    .add("PageThumbnail", () => (
        <PreviewFrame>
            <PageThumbnail
                imageSource={getTemplatePageImageSource(
                    "c:/bloomdesktop/output/browser/templates/template books/basic book",
                    "Basic Text & Picture",
                    "landscape"
                )}
                isLandscape={true}
            />
        </PreviewFrame>
    ));
