type Options = {
    multiple?: boolean,
    accept?: string,
    directory?: boolean
};

let input: HTMLInputElement | undefined;

export default function (o?: Options): Promise<FileList> {
    if (input)
        document.body.removeChild(input);

    input = document.createElement("input");
    input.style.visibility = "hidden";
    document.body.appendChild(input);
    input.setAttribute("type", "file");

    if (o) {
        if(o.multiple)
            input.setAttribute("multiple", "");
        if(o.accept)
            input.setAttribute("accept", o.accept);
        if (o.directory)
            input.setAttribute("webkitdirectory", "");
    }
    return new Promise(resolve => {
        input!.onchange = () => {
            if (input!.files)
                resolve(input!.files);

            document.body.removeChild(input!);
            input = undefined;
        };
        input!.click();
    });
}