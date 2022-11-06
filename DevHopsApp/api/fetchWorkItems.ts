import type { WorkItem } from '../types'

export const fetchWorkItems = async (): Promise<WorkItem[]> => {
    return [
        {
            id: "de08daf4-5d70-11ed-9b6a-0242ac120002",
            title: "Create a massing",
            description: "Task description here",
            testpassed: true,
            assignee: "Anders",
            statusUpdates: [
                {
                    id: "de08daf4-5d70-11ed-9b6a-0242ac120002",
                    timestamp: Date.now().toString(),
                    username: "Jo",
                    status: "inprogress",
                    comment: "Be better.",
                    image: "iVBORw0KGgoAAAANSUhEUgAAAZAAAABaCAYAAACWuwCqAAAACXBIWXMAAAsSAAALEgHS3X78AAAFnklEQVR4nO3cT04cRxQH4OooFxgfYXyALPA+G3wEfAS8zBIfAY6ALxAJjgCb7IeFpSQ7o2SbSBBlFylKR4VfWeWhB8+8YGwm3yeNPHR3VXX39Jtf/wEP4zgWANjUV/YYABkCBIAUAQJAigABIEWAAJAiQABIESAApAgQAFIECAApX2/BbvOn9Bv4+ffy5u9/yjePZoU/s+9/Kj/8+Fv59n+9Ezbw51/lzS9/OL428et3ZXg8a/shVyAApAgQAFIECAApAgSAFAECQIoAASBFgACQIkAASBEgAKQIEABSBAgAKQIEgBQBAkCKAAEgRYAAkCJAAEgRIACkCBAAUgQIACkCBIAUAQJAigABIEWAAJAiQABIESAApAgQAFIECAApAgSAFAECQIoAASBFgACQIkAASBEgAKQIEABSBAgAKQIEgBQBAkCKAAEgRYAAkCJAAEgRIACkCBAAUgQIACkCBIAUAQJAigABIEWAAJAiQABIESAApAgQAFIECAApAgSAFAECQIoAASBFgACQIkAASBEgAKQIEABSBAgAKQIEgJRhHEd7DoCNuQIBIEWAAJAiQABIESB3GIZhfxiGB3tINAzDSR1zwzbHwzCc3eM63Gt/S30/6P7kfqiD+7VNdSBA7jCO4+txHIcHHHLnAceCtagDVnn0ATIMw7ymeZwxjPE66OYfdNMXwzDcOjhj+nKbs+UzhTgzan2dddMO4/1eP370s4h1XHRtjyfWofY3L6Ucd+0/GG8YhtlH9kUd72p5nNiOq6X+dmPeLPqu06764h2G4W03b4z+9yf62F3avkX028a9iv046/reiem7m37mfBrq4HYddN8vfR3sdt83tUbma467dXWwTVcg8zhLelVKOWxfYPV9KeV5zLsopZxMHICnpZS97uf6/rxfIA7m+iE/K6U8qQdBHCAXMb10X77z7ufaT12PWaxDbV8PqH68epb3vJRyWUp5OY7jUfRd2z9t49WiWrXxcRAfRvu2H/a7wKztL2LeaSxbHcT61nGed+v+fr/G+C9j2Z2JPup6nXfbtxPb3MZt63Qd61qnndR1HMfxvPClUAer6+A62ryOY7du75OYt7/muNtXB/XvQB7zKz7o+mZ3+ef4cE7a9sWHWN/s9dvctdmJ1xjT9t/toptlFvUA6drUeVfd8u1gqMstYpk2/zDeH0cBTe7zUsrb2m/X9qCbt9fGWWpT+zyb6KvfD++3o1v3sRuzH+ek9dfP6/dR/FwL7u0d23GwatzYR7fW2evzvtTB7TqY+H652d5uubrMcWbcbaiDbX8GMmtpX959gtfd9NJNv+zOoHbjDOVyoq/3t8O6IriIMVrbelaz0x4C1vnjOL6KM5ebg2/VrbS71r17v/Lyvbu0PomCWMd8aZyLj7S5Xp4Ql/nH7bJ+4uxtqo/ddunPl0EdrF0Ht2ogOe6jr4NtD5DrpfuNs276stM4sPfj/VRf9VJz6F8xrxXFLN5fxxn4+8vSWjzdpXuJ+Wuve/d+5cEbZ0MlbgE8m1puwsXSOBsdzLFPF127p6vWsYnbFOdr7AMenjp4Z9M62HjcbaiDbQ+Q+uHsdQ+oDuPAm7rfeBoHzXxF4Zz29zTjodoi5l10Z2yt/3kbJ85Kbh4sx5laiYNsymxpvHl8SR/Ec4ZVX87tDOooXivvE6/Yrnls294abXqz9oUxjmN7TnLnQ85w1N075suhDnJ1kB33UdfBVgdI/fXDeJh1FpfbO/FA/dbB112+T1221/lHMX/R/SbFi5jdAqm1a8XRCvAo/r3qfpulTeudxi8AHMSX8UVcCl"
                }
            ]
        }
    ]
}