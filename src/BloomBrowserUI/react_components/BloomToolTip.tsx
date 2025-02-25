import { Tooltip, TooltipProps } from "@mui/material";
import { Span } from "./l10nComponents";
import * as React from "react";

type l10nDefinition = {
    l10nKey: string;
    // Probably we should just stop sticking the english in at all, but for now it's optional
    // so as not to break existing code. It gets ignored as long as we find the l10nKey.
    english?: string;
};
type TipContent = l10nDefinition | React.ReactElement | string;

export interface IBloomToolTipProps {
    tip?: TipContent;
    tipWhenDisabled?: TipContent;
    showDisabled?: boolean;
    hidden?: boolean;
    placement?: TooltipProps["placement"];

    // Good practice with a tooltip calls for some aria attributes to indicate the relationship
    // of the tooltip to its parent, so we need a unique ID. The supplied ID will be applied to the tooltip.
    id?: string;
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isL10nDefinition(obj: any): obj is l10nDefinition {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.l10nKey === "string"
    );
}

export const BloomTooltip: React.FunctionComponent<IBloomToolTipProps> = props => {
    let tipContent: React.ReactNode;
    if (props.showDisabled) {
        const l10nDef = props.tipWhenDisabled as l10nDefinition;
        tipContent = isL10nDefinition(props.tipWhenDisabled) ? (
            <Span l10nKey={l10nDef.l10nKey}>{l10nDef.english}</Span>
        ) : (
            props.tipWhenDisabled
        );
    } else {
        const l10nDef = props.tip as l10nDefinition;
        tipContent = isL10nDefinition(props.tip) ? (
            <Span l10nKey={l10nDef.l10nKey}>{l10nDef.english}</Span>
        ) : (
            props.tip
        );
    }
    return (
        <Tooltip
            id={props.id}
            title={tipContent}
            placement={props.placement || "left"}
            arrow
        >
            {/* The added <span> here allows the tooltip to show even when the target control is disabled */}
            <span>{props.children}</span>
        </Tooltip>
    );
};
