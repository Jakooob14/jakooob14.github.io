import {cloneElement, Fragment, ReactElement, ReactNode} from "react";

interface TranslateProps{
    value: string,
    components: Record<string, ReactNode>
}

export default function Translate({value, components}: TranslateProps) {
    const regex = /<(\w+)(.*?)>(.*?)<\/\1>/g;

    const parseAttributes = (attributesString: string) => {
        const attributes: Record<string, string> = {};
        const attrRegex = /(\w+)=['"]([^'"]+)['"]/g;
        let match;

        while ((match = attrRegex.exec(attributesString)) !== null) {
            const [_, key, value] = match; 
            attributes[key] = value;
        }
        return attributes;
    };

    const parsedTemplate = value.split(regex).map((part, index, arr) => {
        if (index % 4 === 0) {
            
            return <Fragment key={index}>{part}</Fragment>;
        }

        const tagName = arr[index]; 
        const attributes = arr[index + 1]; 
        const content = arr[index + 2]; 

        if (components[tagName]) {
            const component = components[tagName];
            const parsedAttributes = parseAttributes(attributes); 

            return cloneElement(
                component as ReactElement,
                { ...parsedAttributes, key: index },
                content
            );
        }
        return <Fragment key={index}>{content}</Fragment>;
    });
    return <>{parsedTemplate}</>;
};