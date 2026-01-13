import { cloneElement, Fragment, ReactElement, ReactNode } from 'react';
import he from 'he';

interface TranslateProps {
    value: string;
    components: Record<string, ReactNode>;
}


const decodeHtmlEntities = (text: string) => he.decode(text);

export default function Translate({ value, components }: TranslateProps) {
    const regex = /<(\w+)(.*?)>(.*?)<\/\1>/g;

    const parseAttributes = (attributesString: string) => {
        const attributes: Record<string, string> = {};
        const attrRegex = /(\w+)=['"]([^'"]+)['"]/g;
        let match;

        while ((match = attrRegex.exec(attributesString)) !== null) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, key, value] = match;
            attributes[key] = value;
        }
        return attributes;
    };

    const parsedTemplate: ReactNode[] = [];
    let lastIndex = 0;
    
    value.replace(regex, (match, tagName, attributes, content, offset) => {
        if (lastIndex < offset) {
            const rawText = value.slice(lastIndex, offset);
            parsedTemplate.push(<Fragment key={ lastIndex }>{decodeHtmlEntities(rawText)}</Fragment>);
        }
        
        if (components[tagName]) {
            const component = components[tagName];
            const parsedAttributes = parseAttributes(attributes);

            parsedTemplate.push(
                cloneElement(component as ReactElement, { ...parsedAttributes, key: offset }, decodeHtmlEntities(content))
            );
        } else {
            parsedTemplate.push(<Fragment key={ offset }>{decodeHtmlEntities(content)}</Fragment>);
        }

        lastIndex = offset + match.length;
        return ''; 
    });

    if (lastIndex < value.length) {
        const rawText = value.slice(lastIndex);
        parsedTemplate.push(<Fragment key={ lastIndex }>{decodeHtmlEntities(rawText)}</Fragment>);
    }

    return <>{parsedTemplate}</>;
}
