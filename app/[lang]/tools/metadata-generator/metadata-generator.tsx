'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Fragment, FunctionComponent, useState} from "react";
import {Combobox, Dialog, Transition} from "@headlessui/react";
import {HiChevronUpDown} from "react-icons/hi2";
import {HiCheck} from "react-icons/hi";
import {useSearchParams} from "next/navigation";

export default function MetadataGenerator({ dict, lang }: any) {
    const searchParams = useSearchParams();

    const popup = searchParams.get('popup') as string;
    const [popupOpen, setPopupOpen] = useState(popup === 'on')

    const params = {
        title: searchParams.get('title') as string,
        url: searchParams.get('url') as string,
        description: searchParams.get('description') as string,
        keywords: searchParams.get('keywords') as string,
        image: searchParams.get('image') as string,
        author: searchParams.get('author') as string,
        language: searchParams.get('language') as string,
        robots: searchParams.get('robots[name]') as string,
        charset: searchParams.get('charset') as string,
        revised: searchParams.get('revised') as string,
        copyright: searchParams.get('copyright') as string
    }

    const ogParams = {
        title: params.title,
        url: params.url,
        description: params.description,
        image: params.image
    }
    const twitterParams = {
        card: 'summary_large_image',
        title: params.title,
        url: params.url,
        description: params.description,
        image: params.image
    }

    let trimmedUrl = '';

    if (params.url) {
        trimmedUrl = params.url.replace(/https:\/\/(www\.)?/gi, '');
        trimmedUrl = trimmedUrl.replace(/\/.*/gi, '')
    }

    return (
        <>
            <Header dict={dict} lang={lang}/>
            <main className={'min-h-[calc(100vh-8rem)]'}>
                <div className={'container px-4 mx-auto py-20 flex flex-col items-center justify-center'}>
                    <h1 className={'text-5xl font-bold mb-10 text-center'}>Metadata Generator</h1>
                    <form className={'lg:w-[944px] flex flex-col gap-6'}>
                        <Input className={'w-full'} name={'title'} label={'Title'} counter warnChars={61} placeholder={'Should not be more than 60 characters'} type={'text'} defaultValue={params.title}/>
                        <Input className={'w-full'} name={'url'} label={'URL (For preview)'} placeholder={'https://jakooob.dev/'} type={'text'} defaultValue={params.url ? params.url : 'https://jakooob.dev/'}/>
                        <TextArea className={'w-full'} name={'description'} label={'Description'} counter warnChars={151} placeholder={'Should not be more than 150 characters'} defaultValue={params.description}/>
                        <Input className={'w-full'} name={'keywords'} label={'Keywords'} placeholder={'Apples, Bees, Cables'} type={'text'} defaultValue={params.keywords}/>
                        <Input className={'w-full'} name={'image'} label={'Image (Use an image URL)'} placeholder={'https://imgur.com/kL0kB48.jpg'} type={'text'} defaultValue={params.image}/>
                        <div className={'flex flex-wrap lg:flex-nowrap gap-4'}>
                            <Input type={'text'} name={'author'} label={'Author'} className={'w-full lg:w-36'} placeholder={'John Doe'} defaultValue={params.author}/>
                            <Input type={'text'} name={'language'} label={'Language'} className={'w-full lg:w-20'} placeholder={'EN'} defaultValue={params.language}/>
                            <MyCombobox className={'w-full lg:w-52'} name={'robots'} title={'Robots'} yourInputs={['-', 'index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow']} defaultValue={params.robots}/>
                            <Input name={'charset'} type={'text'} label={'Charset'} className={'w-full lg:w-20'} placeholder={'UTF-8'} defaultValue={params.charset}/>
                            <Input name={'revised'} type={'date'} label={'Revised'} className={'w-full lg:w-[23rem]'} placeholder={'UTF-8'} defaultValue={params.revised}/>
                        </div>
                        <Input name={'copyright'} type={'text'} label={'Copyright'} className={'w-full'} placeholder={'Company name'} defaultValue={params.copyright}/>
                        <Input name={'submit'} type={'submit'} value={'Code & Preview'}/>

                        <input name={'popup'} hidden aria-hidden type={'checkbox'} checked={true} readOnly/>
                    </form>
                    <span className={'mt-4'}>If there are any issues, send me an e-mail at <a href={'mailto:me@jakooob.dev'}>me@jakooob.dev</a></span>
                </div>
            </main>


            <Transition appear show={popupOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setPopupOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto py-20">
                        <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-[1078px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        <div className={'flex justify-center'}>
                                            <div className={'mb-8 w-[600px]'}>
                                                <h2 className={'text-gray-500 mb-3'}>Google</h2>
                                                <div className={'flex items-center'}>
                                                    <div>
                                                        <div className={'bg-[#f1f3f4] w-[28px] h-[28px] rounded-full flex justify-center items-center mr-[12px]'}>o</div>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <span className={'font-Arial text-sm text-[rgb(32,33,36)]'}>{params.title}</span>
                                                        <span className={'font-Arial text-[12px] text-[rgb(77,81,86)]'}>{params.url}</span>
                                                    </div>
                                                </div>
                                                <h3 className={'font-Arial text-xl text-[rgb(26,13,171)] my-[3px]'}>{params.title}</h3>
                                                <span className={'font-Arial text-sm text-[#4d5156] text-ellipsis line-clamp-2 break-all'}>{params.revised ? `${params.revised} — ` : ''}{params.description}</span>
                                            </div>
                                        </div>
                                        <div className={'md:flex flex-wrap justify-center gap-6'}>
                                            <div>
                                                <h2 className={'text-gray-500 mb-3'}>X / Twitter</h2>
                                                <div className={'mb-8 rounded-[14px] w-full md:w-[506px] border-[1px] border-[#e1e8ed] overflow-hidden'}>
                                                    <div className={'w-full h-[252px] overflow-hidden'}>
                                                        <img src={params.image} alt={''} className={'w-full h-full object-cover object-center'}/>
                                                    </div>
                                                    <div className={'w-full h-[103px] px-[14px] py-[10px] text-black border-t-[1px]'}>
                                                        <h3 className={'text-[14px] font-semibold'}>{params.title}</h3>
                                                        <h3 className={'text-[14px] mt-[4px] h-[36px] line-clamp-2 text-ellipsis break-all'}>{params.description}</h3>
                                                        <h3 className={'text-[14px] mt-[4px] text-[rgb(136,153,166)]'}>{trimmedUrl}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className={'text-gray-500 mb-3'}>Facebook</h2>
                                                <div className={'mb-8 md:w-[500px] border-[1px] border-[rgb(218,221,225)] overflow-hidden'}>
                                                    <div className={'w-full h-[261px] overflow-hidden'}>
                                                        <img src={params.image} alt={''} className={'w-full h-full object-cover object-center'}/>
                                                    </div>
                                                    <div className={'w-full h-[78px] px-[12px] py-[10px] text-black border-t-[1px] bg-[rgb(242,243,245)]'}>
                                                        <h3 className={'text-[12px] uppercase text-[rgb(96,103,112)]'}>{trimmedUrl}</h3>
                                                        <h3 className={'text-[14px] font-semibold'}>{params.title}</h3>
                                                        <h3 className={'text-[14px] text-[rgb(96,103,112)] line-clamp-1 text-ellipsis break-all'}>{params.description}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <pre className={'bg-blue-100 p-3 rounded overflow-x-scroll'}>
                                            <code className={'lang-html text-black'}>
                                              {Object.entries(params).map(([key, value]) => (
                                                  value && value !== '-' && (
                                                      <span key={value}>&lt;<strong>meta</strong> name=&quot;{key}&quot; content=&quot;{value}&quot;/&gt;<br/></span>
                                                  )
                                              ))}
                                                <br/>
                                              {Object.entries(ogParams).map(([key, value]) => (
                                                  value && (
                                                      <span key={value}>&lt;<strong>meta</strong> property=&quot;og:{key}&quot; content=&quot;{value}&quot;/&gt;<br/></span>
                                                  )
                                              ))}
                                                <br/>
                                              {Object.entries(twitterParams).map(([key, value]) => (
                                                  value && (
                                                      <span key={value}>&lt;<strong>meta</strong> property=&quot;twitter:{key}&quot; content=&quot;{value}&quot;/&gt;<br/></span>
                                                  )
                                              ))}
                                            </code>
                                        </pre>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Footer/>
        </>
    )

}

const Input: FunctionComponent<{ className?: any, name: string, label?: string, counter?: boolean, warnChars?: number, placeholder?: string, type: string, defaultValue?: string, value?: string }> = (props: any) => {
    const [count, setCount] = useState(0);

    return (
        <label className={`input-label ${props.className}`}>
            <p><span>{props.label}</span>{props.counter ? <span className={`float-right ${props.warnChars ? (count >= props.warnChars ? '!text-amber-400' : '') : ''}`}>{count}/{props.warnChars - 1}</span> : ''}</p>
            <input name={props.name} className={`input input-text w-full ${props.warnChars ? (count >= props.warnChars ? '!border-amber-400' : '') : ''}`} onChange={e => {setCount(e.target.value.length)}} placeholder={props.placeholder} type={props.type} defaultValue={props.defaultValue} value={props.value}/>
        </label>
    )
}
const TextArea: FunctionComponent<{ className?: any, name: string, label?: string, counter?: boolean, warnChars?: number, placeholder?: string, defaultValue?: string, value?: string }> = (props: any) => {
    const [count, setCount] = useState(0);

    return (
        <label className={`input-label ${props.className}`}>
            <p><span>{props.label}</span>{props.counter ? <span className={`float-right ${props.warnChars ? (count >= props.warnChars ? '!text-amber-400' : '') : ''}`}>{count}/{props.warnChars - 1}</span> : ''}</p>
            <textarea name={props.name} className={`input input-text w-full max-h-72 ${props.warnChars ? (count >= props.warnChars ? '!border-amber-400' : '') : ''}`} onChange={e => {setCount(e.target.value.length)}} placeholder={props.placeholder} defaultValue={props.defaultValue} value={props.value}/>
        </label>
    )
}

const MyCombobox: FunctionComponent<{ className?: string, name: string, yourInputs: string[], title?: string, defaultValue?: string }> = (props: any) => {
    let inputs: { id: number, name: string }[] = [];

    let nextId = 0;
    for (const name of props.yourInputs) {
        inputs.push({
            id: nextId++,
            name: name
        });
    }

    let find = inputs.find(item => item.name === props.defaultValue);
    if (!find) {
        inputs.push({
            id: nextId,
            name: props.defaultValue
        })
    }

    const [selected, setSelected] = useState(props.defaultValue ? (find ? inputs[find.id] : inputs[nextId]) : inputs[0])

    const [query, setQuery] = useState('')
    const filteredInputs =
        query === ''
            ? inputs
            : inputs.filter((input) =>
                input.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className={props.className}>
            <Combobox name={props.name} value={selected} by={'id'} onChange={setSelected}>
                <Combobox.Label className={'input-label ms-1'}>{props.title}</Combobox.Label>
                <div className="relative">
                    <div className="relative w-full cursor-default text-left !ring-0 !ring-offset-0">
                        <Combobox.Input
                            className="input w-full py-2 pl-3 pr-10"
                            displayValue={(input: any) => input.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiChevronUpDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {/*{query.length > 0 && (*/}
                            {/*)}*/}
                            {filteredInputs.length === 0 && query !== '' ? (
                                <Combobox.Option value={{ id: null, name: query }}>
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-200">
                                        {query}
                                    </div>
                                </Combobox.Option>
                            ) : (
                                filteredInputs.map((input) => (
                                    <Combobox.Option
                                        key={input.id}
                                        className={`relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-blue-700 ${selected.id == input.id ? 'bg-blue-800' : 'text-gray-200'}`} value={input}
                                    >
                                        {({}) => (
                                            <>
                        <span
                            className={`block truncate ${
                                selected.id == input.id ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {input.name}
                        </span>
                                                {selected.id == input.id ? (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white`}>
                                                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
