import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFile1646503311317 implements MigrationInterface {
  name = 'CreateTableFile1646503311317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_aa58d855a2bc4dbe19797f8523c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` CHANGE \`boardListId\` \`boardId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` CHANGE \`file\` \`file_id\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            CREATE TABLE \`files\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`owner_id\` bigint NOT NULL,
                \`driver\` varchar(255) NOT NULL,
                \`path\` varchar(255) NOT NULL,
                \`filename\` varchar(255) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                \`s3_key\` varchar(255) NOT NULL,
                \`s3_bucket\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP COLUMN \`file_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD \`file_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_8a75fdea98c72c539a0879cb0d1\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_8a75fdea98c72c539a0879cb0d1\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP COLUMN \`file_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD \`file_id\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE \`files\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` CHANGE \`file_id\` \`file\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` CHANGE \`boardId\` \`boardListId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_aa58d855a2bc4dbe19797f8523c\` FOREIGN KEY (\`boardListId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
