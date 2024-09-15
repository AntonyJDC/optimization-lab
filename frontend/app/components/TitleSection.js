export default function TitleSection({ children, id }) {
    return (
        <h2 className="text-center mb-6 text-4xl font-bold text-gray-800 dark:text-white" id={id}>
            {children}
        </h2>
    );
}
